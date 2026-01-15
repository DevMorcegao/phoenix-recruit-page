# Environment Configuration Guide for Phoenix

## Discord Webhook Setup

To enable form submissions to Discord, you need to create a `.env.local` file in the root directory of the project.

### Steps:

1. Create a file named `.env.local` in `c:\Users\USER\Documents\Phoenix\`

2. Add the following content to the file:

```bash
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1438036637006430282/YdYizEhIVnFDa-Mz1hoVE0NaKtzRGEbo1oKWbigIU1bywrgN_ahxpesW0k45DX_jftsm
```

3. Save the file

4. Restart the development server

### Security Note

The `.env.local` file is automatically ignored by git (as configured in `.gitignore`), so your webhook URL will not be committed to version control.

## Verification

After creating the file, you can verify it's working by:

1. Running `npm run dev`
2. Submitting the recruitment form
3. Checking your Discord channel for the webhook message
