## Linking Design Tokens Plugin to Remote Repository

- Generate an access token for the repository. For specific instructions see below.
    <details>
    <summary>GitHub</summary>
    <ul>
    <li> Go <a href="https://github.com/settings/tokens">here</a> or click on your profile icon > <code>Settings</code> > <code>Developer settings</code> > <code>Personal access tokens</code> and click `Generate new token`.</li> 
    <li>Add note detailing what the token is used for.</li>
    <li>Decide whether token should expire or not.</li>
    <li>Select scope <code>repo</code>.</li>
    <li>Scroll down and click <code>Generate token</code>. Copy the token. If the page is closed, you will not be able to see the token again.</li>
    </ul>
    </details> 

- In order to successfully receive the tokens in the repository we need to define a custom process. We can do so either by directly committing a `.yml` file to the repository, or adding a workflow using the tools within the repository. 
- The name of the file can be anything. In this case let's use `receive-tokens.yml` which needs to be located in `project-root/.github/worflows/receive-tokens.yml`.
- Insert the following into the `yml` file.
  <details>
      <summary>Show contents of receive-tokens.yml file</summary>
  
      name: receive tokens send from figma

      on:
      repository_dispatch:
          types: update-tokens

      jobs:
      build:
          name: receive figma .json tokens file and save it in a tokens folder
          runs-on: ubuntu-latest
          steps:
          - uses: actions/checkout@master

          - name: mkdir "tokens" directory
              run: 'mkdir -p tokens'

          - name: create json from request body
              id: create-json
              uses: jsdaniell/create-json@1.1.2
              with:
              # it uses the name from your settings that was send as then tokenFileName parameter
              name: 'design-tokens.tokens.json'
              # it uses the json string that was send as the tokens parameter
              json: ${{ github.event.client_payload.tokens }}
              # it uses the directory named "tokens" to store this json file (change this if you changed it above to use a different folder)
              dir: 'tokens'

              # We now create a pull request
          - name: Create PR
              uses: peter-evans/create-pull-request@v3
              with:
              commit-message: 'Tokens updated'
              title: 'Design tokens updated'
              body: 'Design tokens have been updated via Figma and need to be reviewed.'
              env:
              GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
              # this parameter is optional and defaults to master but I am using main
              BRANCH_NAME: 'main'
  </details>
- This process will create a tokens folder with the JSON data inside the repository, and create a pull request to merge the updated tokens.

- In Figma go to `Plugins` > `Design Tokens` > `Send Design Tokens to Url`.
  - Under `Auth type` if not already selected, select `(Github) token`.
  - Under `Server url` enter a URL in the following format: `https://api.github.com/repos/:user/:repo/dispatches` where `:user` corresponds to your itHub username, and `:repo` corresponds to the name of your repository.
  - Under `Access token` paste the token copied from GitHub.
  - Click `Save & Export`.
- Give `receive-tokens.yml` process a bit of time to run and a pull request will be created.

