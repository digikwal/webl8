// ./src/routes/push/+page.server.js
import { pushTranslationsToWeblate } from '$lib/api.js';

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request }) => {
        const form = await request.formData();
        const token = form.get('token')?.toString();
        const component = form.get('component')?.toString();
        const accepted = form.get('accepted');

        if (!token || !component || !accepted) {
            return { success: false, error: 'Missing data.' };
        }

        let translations;
        try {
            translations = JSON.parse(accepted);
            if (!Array.isArray(translations)) {
                throw new Error('Accepted translations must be an array.');
            }
        } catch (e) {
            return { success: false, error: 'Invalid translations JSON.' };
        }

        const { data, error } = await pushTranslationsToWeblate({ token, component, translations });

        if (error) {
            return { success: false, error };
        }

        return { success: true, count: data.length };
    }
};
