import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "./prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

export const sendSignUpEmail = inngest.createFunction(
    {id: 'send-sign-up-email', triggers: {event: 'app/user.created'}},
    async ({event, step}) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace("{{userProfile}}", userProfile);

        const response = await step.ai.infer('generate-welcome-intro', {
            model: step.ai.models.gemini({model: 'gemini-3.5-flash-lite'}),
            body: {
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {text: prompt}
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async () => {
            const part = response.candidates?.[0]?.content?.parts?.[0];
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining Signalist! You now have access to our tools to track stocks and get real-time alerts.';

            const { data: {email, name}} = event;
            return await sendWelcomeEmail({
                email,
                name,
                intro: introText
            })

        })

        return{
            status: true,
            message: 'Welcome email sent successfully'
        }
    }
)