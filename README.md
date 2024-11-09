# 📧 Email Input Component

A React-based email input component for managing multiple email entries in a single input field. Users can add, remove, and edit emails, with chips dynamically adjusting within the container space.

---

## ✨ Features

- **Add Emails**: Press `Enter`, `,` or `Space` to add an email.
- **Delete Emails**: Remove any email by clicking the "x" icon on each chip.
- **Edit Last Email**: Press `Backspace` on an empty input to move the last chip back for editing.
- **Automatic Focus**: Clicking empty space in the container focuses the input.
- **Dynamic Chip Display**: Automatically hides overflowed chips, showing as `+X` for hidden count.

---

## 🚀 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/email-input-component.git
   cd email-input-component
   ```

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```

4. **To see as a standalone page**:

Navigate to http://localhost:5173/

---

## 📚 Usage

To use this component in your project, import it and add it to your component tree.

**Basic Example**

```tsx
import EmailComponentExample from "./example/EmailComponentExample";
import "./styles/App.scss";

export type EmailObject = {
	id: number;
	email: string;
};

export default function App() {
  return (
    <div className="flex h-screen w-full justify-between relative flex-col">
      <div className="flex flex-col px-4 py-6 items-center w-full">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-blue-800">
	    Email Input Example
	  </h1>
	</header>
	<EmailComponentExample />
      </div>
    </div>
  );
}
```

## 📜 Design and structure

#### Structure
The structure of the app is fairly straightforward. 
* In the src folder, the `main.tsx` file holds the createRoot component, while the `App.tsx` file contains the structure of the app itself.
* The example folder holds the demo email component.
* The rest of the folders follow standard naming conventions

```
src
  -assets
  -components
  -hooks
  -styles
  -utils
```
Being such a small app, many of the folders are very sparsely populated ;)

#### Styling
For styling I used a combination of [Tailwindcss](https://tailwindcss.com/docs) and SCSS. Most of the app uses Tailwind for layout, but I added a few custom classes for components requiring a bit more complex or detailed styling, for maintainability. If I were to expand this app I would make these components more reusable, and give each one its own stylesheet in an individual component folder.

###### For example

```
src
  -components
    --Button
      ---Button.tsx
      ---Button.scss
    --EmailInput
      ---EmailInput.tsx
      ---EmailInput.scss
```

For the SCSS I used variables and mixins, which is best for a single source of truth in a bigger app.


## 🧩 Challenges and Concerns
### Technical

1. **Storing emails**: This was easily accomplished with a useState() function in the parent component, where an array of EmailObjects is stored. The actual useState function is one of the functions in the `useEmails()` hook.

###### Note:
`EmailObject`: An object holding a unique ID and an email address. In this example, that isn't necessarily needed; we could just use the email string, but having an ID to point to an email address can be cleaner if used in a larger app.
   
2. **Adding emails**: A function in the useEmails() hook, which simply adds a new email object to the currently stored emails. Before adding the email it does a very basic validation, making sure there is a '@' symbol and a '.', and that you haven't already added this email to your list of recipients.
3. **Error handling**: A function in the useEmails() hook, if the email is improperly validated or added it changes the `error` state from null to a message. The Demo component then uses an error component to display the message, which will disappear as soon as the user begins to type again using the clearError() function in the hook.
4. **Deleting emails**: A function in the useEmails() hook, uses the emailObject id to find and delete an email.

### UX and design
1. **Displaying the email chips**: The goal was to type in an email address and display it as a small email chip component inside the input area. While you can't actually store a design element inside of a text input, you can create a container that looks like an input, with an unstyled input inside of it, then dynamically add the chips in front of the actual input.
2. **Adding an email chip**: From a UI perspective, I wanted the adding of the address to be intuitive. So when the enter key, the space bar or the ',' character is pressed, it attempts to add the new email address.
3. **Hiding email chips**: When the size of the gray email chips in the container gets too big, we want to hide however many are needed to give the user enough space to continue typing. The best way to do this is by creating refs of the container and all the chips. Every time a chip is created a Map object is created which stores the width of the chip and its id. This way, every time an action is taken in the input area, the Map is evaluated and calculated, adding up widths from the beginning of the Map to determine if they can fit or not. Then the count of how many chips are hidden is stored, to be displayed on a chip showing that number. This functionality is all stored in the useEmailInput() hook.
4. **Viewing all emails**: If the overflowing email chips are hidden, how do we make sure we have all of the ones we want? I opted to make a modal that displays when you click on the `+3` email chip, but an argument could certainly be made for displaying it on hover. Inside this modal, you also have the opportunity to delete any unwanted emails. If this happens, the email chips are evaluated, and if none of them need to be hidden anymore, the modal will disappear. Otherwise, clicking outside of it or on the `+3` will hide it as well.
5. **Editing emails**: If the user hits the backspace button, the last email chip will be removed from the current emails list, and the value put back in the text input for editing. The same happens if the user clicks on the chip (but only from the input area, I would have to think about whether it makes sense to have it happen from the modal as well.)

## 🥳 And that's about it!
I hope you enjoyed this little demo. Feel free to check out the rest of my [GitHub](https://github.com/hzuber) or my [LinkedIn](https://www.linkedin.com/in/hzuber-dev/)
