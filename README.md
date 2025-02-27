# TokenMate - Web Finite Automata Tokenizer

<div align="center">
  <img src="src/assets/TokenMate-logo.png" alt="TokenMate Logo" width="200"/>
  <p><em>State-of-the-art text tokenization powered by Finite Automata Theory</em></p>
</div>

## 🎯 Overview

TokenMate is a modern and sophisticated web-based tokenizer that leverages deterministic finite automata to provide precise token recognition with explicit state transitions. Perfect for processing modern web content and structured text analysis.

## ⚡ Key Features

- **Pattern Recognition**: Processes words, phrases, and sentences using state-based transitions
- **URL Detection**: Identifies and validates web URLs and domain patterns
- **Social Media Content**: Recognizes hashtags, mentions, and modern web content
- **Email Validation**: Validates email addresses through multi-state transitions
- **Unicode & Emoticons**: Processes emoji codes and ASCII emoticons accurately

## 🔧 Technical Implementation

TokenMate uses a sophisticated state machine with:
- Deterministic Finite Automata (DFA) for token processing
- Real-time state transitions
- Pattern matching with explicit state sequences
- Support for Unicode characters and special sequences

## 🎨 Token Types

- URLs (states: 20-22)
- Hashtags (states: 30-31)
- Mentions (states: 40-41)
- Emoticons (states: 50-52)
- Emoji Unicode (states: 61)
- Email Addresses (states: 70-75)

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## 📝 Usage Examples

```javascript
// Basic token recognition
const tokenizer = new TokenMate();
const result = tokenizer.analyze("Check out https://example.com! #awesome @user 😊");

// Output:
// {
//   urls: ["https://example.com"],
//   hashtags: ["#awesome"],
//   mentions: ["@user"],
//   emojis: ["😊"]
// }
```

## 🔄 State Transition Examples

```mermaid
graph LR
    S((0-START)) --> W[1-WORD_START]
    S --> U[20-URL_START]
    S --> H[30-HASHTAG_START]
    S --> M[40-MENTION_START]
    S --> E[50-EMOTICON_START]
    S --> EJ[60-EMOJI_START]
    S --> EM[70-EMAIL_START]

    %% Word Path
    W --> VW((2-VALID_WORD))

    %% URL Path
    U --> UP[21-URL_PROTOCOL]
    UP --> UD((22-URL_DOMAIN))

    %% Hashtag Path
    H --> VH((31-VALID_HASHTAG))

    %% Mention Path
    M --> VM((41-VALID_MENTION))

    %% Emoticon Path
    E --> EN[51-EMOTICON_NOSE]
    E --> VE((52-VALID_EMOTICON))
    EN --> VE

    %% Emoji Path
    EJ --> VEJ((61-VALID_EMOJI))

    %% Email Path
    EM --> EU[71-EMAIL_USERNAME]
    EU --> EA[72-EMAIL_AT]
    EA --> ED[73-EMAIL_DOMAIN]
    ED --> EDT[74-EMAIL_DOT]
    EDT --> VEM((75-VALID_EMAIL))

    %% Error States
    S --> ERR((99-ERROR))
    ERR --> REC[98-ERROR_RECOVERY]
    REC --> S

    %% Styling
    classDef start fill:#9f9,stroke:#333,stroke-width:2px
    classDef final fill:#f99,stroke:#333,stroke-width:2px
    classDef normal fill:#fff,stroke:#333,stroke-width:1px
    
    class S start
    class VW,UD,VH,VM,VE,VEJ,VEM,ERR final
    class W,U,H,M,E,EJ,EM,UP,EN,EU,EA,ED,EDT,REC normal
```

## 🧪 Running Tests

```bash
npm run test
```

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)

### Project Structure
```
TokenMate/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── router/
│   ├── context/
│   ├── utils/
│   └── assets/
└── configs
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 State Diagram

For a detailed view of the state transitions, check out our [JFLAP State Diagram](public/automata/Final%20FA%20Automata.jff).

## 👥 Authors

- Alfred Nodado - *Full-Stack Developer* - [@Auguzcht](https://github.com/Auguzcht)
- Joshua Famor - *Model Architect* - [@Joshieww](https://github.com/Joshieww)
- Hanna Sato - *Researcher* - [@HSatsss](https://github.com/HSatsss)

## 🙏 Acknowledgments

- Automata Theory principles and implementation guidance
- React and modern web development community
- Contributors and testers