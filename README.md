# Linking Design Tokens Plugin to Remote Repository
### GitHub
- Create a `tokens` branch in remote repository, as we probably should avoid pushing directly to main.
- In GitHub go to [here](https://github.com/settings/tokens) and click `Generate new token`. 
  - Add note detailing what the token is used for. 
  - Decide whether token should expire or not. 
  - Select scope `repo`. 
  - Scroll down and click `Generate token`. Copy the token.
- In Figma go to `Plugins` > `Design Tokens` > `Send Design Tokens to Url`.
  - Under `Auth type` if not already selected, select `(Github) token`.
  - Under `Server url` enter a URL in the following format: `https://api.github.com/repos/:user/:repo/dispatches` where `:user` corresponds to your itHub username, and `:repo` corresponds to the name of your repository.
  - Under `Access token` paste the token copied from GitHub.
- Make a pull request on GitHub.