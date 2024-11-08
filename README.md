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

**Besic Example**

````tsx
import React from 'react';
import EmailChipInput from './EmailChipInput';

const App = () => {
  const handleEmailsChange = (emails) => {
    console.log("Updated emails:", emails);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h1>Email Input Component</h1>
      <EmailChipInput onEmailsChange={handleEmailsChange} />
    </div>
  );
};

export default App```
````
