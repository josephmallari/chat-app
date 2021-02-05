## Edit 3.2.2021
I refactored the structure to handle replies differently. I created a replies array in the Message object. If the "Reply State" is active, 
messages submitted in the form will be pushed into the replies array with the corresponding index. Replies will then be passed as props into
the Message component, and replies are mapped in under the message component.

# Chat App

Chat App built with React/Typescript

It's a one sided conversation with no other user on the other end or bot response.
Has the ablity to:
- Enter text in form
- Reply to message in form

## Installation

Clone master branch

```bash
npm install
```

## Usage
```bash
npm start
```

Then go to localhost:3000 on browser of choice.

Enter a User name.

In the chat box, type in a message and press enter to submit message.

To reply on a message, click on a message to trigger the reply state.
Press enter while on the reply state to submit message, with the reply.

## Details
I used the create-react-app builder for this project along with the `--template typescript` flag.
I broke down the code into three components. The App component, Message component, and Reply component. 
For the purpose of this task, I think that 3 was sufficient. 

For the CSS, I just simply edited the default App.css file. I think that the project was simple enough that using sass was unnecessary or
any other library like styled components or CSS-in-JS. For a more project oriented build, I would have used one of these said libraries.

Parts of the code are commented for more explanation.

I hope you like it and thanks for looking!

