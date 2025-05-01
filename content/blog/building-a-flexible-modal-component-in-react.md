---
title: Building a Flexible Modal Component in React
description: Learn how to create a flexible, accessible modal dialog component in React that can be used across your application.
image: /images/blog/sigmund-recycle-unsplash.jpg
tags: react, components, accessibility
created: 1745302800
lastUpdated:
---

Modal popups are a very common UI pattern that adds a lot of utility to modern web apps. Unfortunately for developers like us, that means we need to master all the technical complexities associated with them. What seems like a simple popup window actually involves a lot of intricate concerns: accessibility, responsive design, keyboard navigation, scroll management, and more. 

For my current project, I wanted to build something that could be reused throughout the application rather than reinventing the wheel each time. In this post, I'll walk through how I created a flexible, reusable modal component that can render content, forms, or whatever else I need to show.

## What exactly do we need here?

I needed a way to display detailed information without navigating users away from the current page. The solution should be versatile enough to handle various use cases: terms and conditions, newsletter signups, contact forms, or notification alerts.

My wishlist looks something like this:

- **Accessibility**: The modal must be accessible and usable for keyboard and screen reader users
- **Scroll Management**: It should prevent scrolling of the underlying page, but allow scrolling within the modal when necessary
- **Flexibility**: The design must be simple enough to easily use anywhere, and adapt to different contexts and content types

<img alt="Modal Component Example" width="480" src="/images/blog/modal-example.png#right" >

### Component Structure

The foundation of any component is its structure, so here are the key parts we need:

1. **Overlay**: A full-screen layer that dims the background and captures clicks outside the modal
2. **Modal Container**: The actual modal window that holds the content
3. **Content Area**: The flexible section that can contain any React nodes
4. **Close Button**: Always accessible, whether in the header or floating

Using React's functional components and hooks approach, the basic structure looks something like this:

```tsx
const Modal = ({ isOpen, onClose, title, children, size, showHeader }) => {
  // State and refs go here, along with my hopes and dreams

  return (
    <div 
      className={`modalOverlay ${isOpen ? 'open' : ''}`}
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={`modalContent`}>
          <div className="modalHeader">
            {title && <h2>{title}</h2>}
            <button 
              className="closeButton"
              onClick={onClose}
              aria-label="Close modal"
            >
              <CloseIcon />
            </button>
          </div>
                
        <div className="modalBody">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### Locking Body Scrolling

When a modal opens, you want to prevent the underlying page from scrolling. This creates a focused experience and prevents confusion when users return to the page. Otherwise, it's like trying to read a book while someone keeps moving your chair. Here's how to fix that using React's useEffect hook:

```tsx
useEffect(() => {
  // Remember how things were before we came along and messed with them
  const originalOverflow = document.body.style.overflow;
  
  if (isOpen) {
    // Prevent scrolling on body when modal is open
    document.body.style.overflow = 'hidden';
  }
  
  // Clean up when component unmounts, like a good developer
  return () => {
    document.body.style.overflow = originalOverflow;
  };
}, [isOpen]);
```

### Accessibility Concerns

It's tempting to pretend accessibility doesn't exist, but we don't want visually impaired users to grab their pitchforks and threaten our livelihood. Instead, we can just set ARIA attributes to help screen readers understand the purpose and state of the modal:

```tsx
<div 
  role="dialog"
  aria-modal="true"
  aria-labelledby={title ? "modal-title" : undefined}
  // ...other attributes
>
  {title && <h2 id="modal-title">{title}</h2>}
  // ...content
</div>
```

### Using React Portals

One vital technical aspect of modals is rendering them outside the normal DOM hierarchy. React's Portal mechanism allows us to mount our modal at the document body level, avoiding issues with z-index and stacking contexts:

```tsx
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const modalContent = (
    // Modal JSX structure here
  );
  
  if (!isMounted) {
    return null;
  }
  
  return createPortal(modalContent, document.body);
};
```

This pattern ensures our modal appears above all other content, regardless of where the component is used in our React tree.

### Scroll Management Within the Modal

For modals with a lot of content, we want the modal itself to scroll while keeping other elements in place. We can accomplish this by making the header sticky and having the content area scroll independently:

```scss
.modalHeader {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--background);
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.modalInfo {
  overflow-y: auto;
  max-height: calc(90vh - 5rem);
}
```

This keeps your header visible while users scroll through that novel-length privacy policy. The close button stays put, so users can escape when they inevitably get bored.

## Using the Modal in Practice

The most immediate application was for displaying detailed information. When users click an item, a modal opens with additional content:

```tsx
function Item({ title, description, image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="itemCard" onClick={() => setIsModalOpen(true)}>
        <Image src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        showHeader={false}
        size="large"
      >
        <div className="itemModalContent">
          <div className="itemModalImage">
            <Image src={image} alt={title} priority={isModalOpen} />
          </div>
          <div className="itemModalInfo">
            <h2>{title}</h2>
            <p>{description}</p>
            <div className="itemModalDetails">
              {/* Additional content */}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
```

### For Forms and Signups

Need to collect some user data without sending them to another page? Same modal, different outfit:

```tsx
function ContactModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalOpen(true)}>
        Get in Touch
      </button>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Contact Us"
        showHeader={true}
        size="medium"
      >
        <ContactForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
}
```

## Wrapping Up

The true value of this approach comes when you need to add new functionality. Instead of building specialized modals for each use case, you can reuse this component with different props and content. This ensures consistency, maintains accessibility standards, and lets you focus on more important things.

Whether you're showing off your best cat photos, collecting emails nobody wants to give you, or displaying important notifications, a well-built modal makes life better for everyone involved - especially future you, who doesn't have to build it again.

### Related Links

- [WAI-ARIA Authoring Practices - Dialog Modal](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [React createPortal() Documentation](https://react.dev/reference/react-dom/createPortal)
- [The A11Y Project - A guide to troublesome UI components](https://www.a11yproject.com/posts/a-guide-to-troublesome-ui-components/#modals)