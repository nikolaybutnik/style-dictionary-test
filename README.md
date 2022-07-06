# Linking Figma Tokens Plugin to Remote Repository
### GitHub
- Create a `tokens` branch in remote repository, as we probably should avoid pushing directly to main.
- In GitHub go to [here](https://github.com/settings/tokens) and click `Generate new token`. 
  - Add note detailing what the token is used for. 
  - Decide whether token should expire or not. 
  - Select scope `repo`. 
  - Scroll down and click `Generate token`. Copy the token.
- In Figma Tokens plugin go to `Settings` > `Token Storage` > `GitHub` > `Add new credentials`.
  - Enter any name.
  - Paste the token copied from GitHub. 
  - Add GitHub repository.
  - Add branch to which JSON should be pushed. Enter "tokens" to push to the `tokens` branch created earlier.
  - Specify file path where tokens should be stored, e.g. `tokens/tokens.json`.
  - Click `Save`.
  - You will now be asked to push your current tokens to remote repository. Add a commit message and click `Push`. Note: if repository already contains tokens, you'll be asked if you want to pull latest tokens. Make sure to backup your current ones as they'll be overwritten.