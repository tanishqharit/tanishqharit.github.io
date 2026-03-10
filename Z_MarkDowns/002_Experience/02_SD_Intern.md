---
sidebar_position: 3
sidebar_label: Software Development Intern
---

# Defense Research and Development Organization
**Software Development Intern** <br/>
*June 2023 – July 2023* <br/>
On-site, Location:  Delhi, India

## TL;DR  🥱
> - I spent 8 weeks at a defense research lab building a **secure, end‑to‑end encrypted real‑time Android chat app** from scratch using **Kotlin, Firebase, and a custom crypto layer (SHA‑256, RSA, AES‑256)**.
> - The backend only sees cipher-text, and all encryption/decryption happens on the device.

---

### Skills

`Kotlin` &nbsp;·&nbsp; `Android Studio` &nbsp;·&nbsp; `XML` &nbsp;·&nbsp; `Android SDK` &nbsp;·&nbsp; `Firebase Authentication` &nbsp;·&nbsp; `Firebase Realtime Database` &nbsp;·&nbsp; `Gradle` &nbsp;·&nbsp; `SHA‑256` &nbsp;·&nbsp; `AES‑256` &nbsp;·&nbsp; `RSA` &nbsp;·&nbsp; `End‑to‑End Encryption` &nbsp;·&nbsp; `NoSQL / JSON Data Modelling` &nbsp;·&nbsp; `Android Emulator` 

---

## Full Story 👇

### Background

(You can drop your own personal story here — how you heard about the internship, why you wanted a tougher, more “builder” role after LTIMindtree, and what it felt like walking into a defense lab for the first time.)  

---

### The Project  

The brief was simple on paper and demanding in practice:  
build an **End‑to‑End Encrypted Realtime Android Chat Application** for Android phones.  

The constraints made it interesting:  

- Users should be able to **sign up and sign in** with email and password.  
- They should see a **real‑time list of other users**, tap a name, and start a chat instantly.  
- Messages should appear in **real time on both sides**, without refresh or manual sync.  
- Most importantly: the **server must never see plaintext**. Every message has to be encrypted on the sender’s device and decrypted only on the receiver’s device.

Underneath that, it’s really a data problem:  
How do you move information between two phones, in real time, through a third‑party backend, in a way that makes it mathematically useless to anyone except those two devices?

---

### The Project  

#### Tools and Stack  

I built the app as a native Android project in **Kotlin**, using:  

- **Android Studio** for development and debugging.  
- **XML** for all layouts: login, signup, user list, chat screen, sent/received bubbles.  
- **Firebase Authentication** for email/password login and signup.  
- **Firebase Realtime Database** as the real‑time message broker.  
- **Android SDK + Emulator** to test multiple virtual devices talking to each other.  
- **Gradle** to manage dependencies and builds.  

On the security side, the stack was:  

- **SHA‑256** for hashing and integrity.  
- **RSA** for public‑key operations and secure key exchange in the design.  
- **AES‑256** as the symmetric cipher for the actual message text.  

All of this is documented in the original internship project report, along with tool descriptions and configuration details.  

---

### What I Did  

#### 1. Got the basics in place  

I started with the boring but necessary parts: setting up the project, wiring Firebase into the app, and making sure I could at least log in and see my own account reflected in the Realtime Database.  

When a user signs up, Firebase Authentication returns a unique **UID**. I used that UID as the primary key in the database and immediately wrote a user profile under a `/user` node:

- name  
- email  
- uid  

On the Android side, the **user list screen** attaches a Firebase listener to `/user`, so whenever a new user signs up anywhere, the list updates in real time. No refresh button, no polling — just a live view of who exists in the system.  

#### 2. Built out the app flow  

Once identity was in place, I focused on the actual app experience:  

- A **Login screen** that authenticates with email/password.  
- A **Signup screen** that validates input, creates an account, and writes the profile to the database.  
- A **User List screen** backed by a RecyclerView + custom adapter that lists all users except the currently logged‑in one.  
- A **Chat screen** where messages scroll in a RecyclerView with different layouts for sent and received bubbles.  

Most of this was standard Android work: intents between activities, RecyclerView adapters, view holders, XML layouts, and manifest configuration. The interesting part was what happened when you actually hit “Send”.  

#### 3. Designed the chat data model  

A chat system lives or dies on its data model. I needed a way to model conversations that was:  

- Simple to resolve (no heavy queries).  
- Stable (same pair of users → same location in the tree).  
- Isolated (no risk of messages leaking into the wrong thread).  

The solution was to construct **room IDs** from the two user IDs. For a pair of users, the app creates two “rooms” — one from sender→receiver, one from receiver→sender. That way, each user has their own copy of the conversation in a predictable place in the database.  

Every time a message is sent:  

- It’s wrapped in a **Message object** (content + sender ID).  
- It’s written into both the sender’s room and the receiver’s room.  

That “dual‑write” sounds like a small implementation detail, but it has a big effect:  
if one user deletes their chat history, they only delete their side. The other person’s copy remains untouched. Each user owns their own data.  

#### 4. Wired in the real‑time layer  

On top of that schema, I added Firebase **ValueEventListeners** on the messages node inside the current room.  

Whenever a new message is pushed into that room in the database, the listener fires, I update an in‑memory list of messages, and notify the RecyclerView adapter. The UI refreshes instantly, and the new message appears on the screen.  

With two emulator instances logged in as different users, it feels exactly like a normal chat app: type on one side, see it pop up on the other.  

#### 5. Built the cryptographic pipeline  

Making it *feel* like a normal chat app was the easy part.  
Making it secure was the real work.  

The core rule was:  

> The backend should only ever see encrypted data.  

So before any message leaves the device, it goes through a crypto pipeline:  

1. The plain text message is prepared.  
2. **SHA‑256** is used where hashing is needed for integrity verification.  
3. **RSA** is used as the asymmetric building block for secure key exchange in the design.  
4. **AES‑256** encrypts the message content itself using a symmetric key.  

The encrypted bytes are then safely encoded so they can be stored as a string in Firebase without corruption. The Realtime Database ends up holding values that look like random noise — which is exactly what you want.  

On the receiving side, the app pulls the encrypted value from Firebase, runs it back through the **AES‑256 decryption** (with the same key), and only then does the user ever see the plaintext.  

All of this happens at the edge — on the devices, not on the server.  

#### 6. Tested, broke things, fixed them, and wrote it all down  

Most of the last stretch was loops of:  

- Run two emulators.  
- Log in as two different users.  
- Send messages both ways.  
- Inspect the Firebase console to make sure only ciphertext is stored.  
- Confirm that the UI shows readable text on both sides and that nothing breaks on reconnects or restarts.  

When everything was stable, I wrote a full **internship project report** walking through: tools and technologies, activity structure, XML layouts, Gradle config, Firebase setup, and the cryptographic techniques used.  

It wasn’t just “code plus screenshots” — it was a proper engineering document, the kind you’d hand to someone who might need to maintain or extend the system later.  

---

### What I Learned  

This internship shifted how I think about systems in a few important ways.  

On the **engineering side**:  

- I learned how to build a **real Android app end‑to‑end** — not just a demo screen, but a multi‑screen workflow with auth, state, and persistence.  
- I got comfortable working with **Firebase** as a backend — especially the realtime listener model, and how it changes the way you think about data flow.  
- I went from “I’ve read about AES and RSA” to actually **implementing cryptography in a production‑style app**, debugging real encoding issues, and seeing the impact of design choices on security.  

On the **data and security side**:  

- I started thinking in terms of **trust boundaries**: who should be allowed to see what, and how do you enforce that structurally, not just with permissions.  
- I saw firsthand how you can turn a typical backend into a **zero‑knowledge relay** — a system that can faithfully store and forward data without ever understanding it.  
- I realised that “real time messaging” is just another kind of **data pipeline** — with all the same concerns about schema, integrity, latency, and failure modes that you see in larger data engineering systems.  

And on a personal level, it taught me what it feels like to work on something where security isn’t a nice‑to‑have, it’s the baseline. That mindset has stuck with me.  

---

### Certificate  

At the end of the internship, I submitted the project report and received an official certificate confirming successful completion of the 8‑week industrial training on the **End‑to‑End Encrypted Realtime Android Chat Application**.  

