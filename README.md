# 📧 Email Input Component

A React-based email input component for managing multiple email entries in a single input field. Users can add, remove, and edit emails, with chips dynamically adjusting within the container space.

---

## ✨ Features

- **Add Emails**: Press `Enter` or `Space` to add an email.
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

4. **To see as a standalone page**

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

## 📜 Props, Design and structure

- `EmailObject`: An object holding a unique id and an email address. In this example that isn't neccesarily needed, we could just use the email string, but if it was used in a larger app having an id to point to email address can be cleaner.

For styling I used a combination of Tailwind.css and SCSS. Most of the app uses Tailwind for layout, but I added a few custom classes for components requiring a bit more complex or detailed styling, for maintainability. If I were to expand this app I would make these components more reusable, and give each one it's own stylesheet in an individual component folder.

\*\*\*\*For example

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
