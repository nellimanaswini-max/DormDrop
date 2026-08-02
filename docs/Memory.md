# DormDrop Memory

## Current Status

Frontend Completed

---

## Completed Features

- Home Page
- Navbar
- Hero Section
- Marketplace Cards
- Search
- Category Filtering
- Favorites
- Item Details
- Contact Seller
- Create Listing
- Image Upload Preview
- Profile Page
- My Listings
- Edit Listing
- Delete Listing

---

## Current Frontend Architecture

App.jsx owns:

- listings
- favorites

Listings are passed via props.

CRUD operations are handled in App.jsx.

Image upload currently uses URL.createObjectURL().

No backend integration yet.

---

## Backend Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Cloudinary
- JWT

---

## Next Task

Start Backend.

1. Express Setup
2. MongoDB Connection
3. Listing Model
4. CRUD APIs
5. Connect React

---

## Important Decisions

- Do not redesign frontend.
- Preserve current UI.
- Preserve folder structure.
- Build backend incrementally.
- Explain architecture before coding.
- Prefer reusable components.

---

## Known Future Improvements

- Custom Delete Modal
- Better Edit Modal
- Click Outside Close
- ESC Close
- Loading Buttons
- Skeleton Loaders