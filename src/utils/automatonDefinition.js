export const automatonDefinition = {
    states: {
      // Center State
      "0": { id: "q0", name: "START", x: 499, y: 408, type: "initial", label: "q0" },
      
      // Grammar States (Left Side)
      "1": { id: "q1", name: "WORD_START", x: 221, y: 342, label: "q1" },
      "2": { id: "q2", name: "VALID_WORD", x: 133, y: 257, type: "final", label: "q2" },
      "3": { id: "q3", name: "PHRASE_START", x: 295, y: 211, label: "q3" },
      "4": { id: "q4", name: "VALID_PHRASE", x: 404, y: 272, type: "final", label: "q4" },
      "5": { id: "q5", name: "SENTENCE_START", x: 46, y: 466, label: "q5" },
      "6": { id: "q6", name: "SENTENCE_BODY", x: 222, y: 466, label: "q6" },
      "7": { id: "q7", name: "VALID_SENTENCE", x: 344, y: 465, type: "final", label: "q7" },
      "8": { id: "q8", name: "PUNCTUATION", x: 475, y: 543, type: "final", label: "q8" },
      
      // Web Content States (Top Right)
      "20": { id: "q20", name: "URL_START", x: 617, y: 210, label: "q20" },
      "21": { id: "q21", name: "URL_PROTOCOL", x: 670, y: 107, label: "q21" },
      "22": { id: "q22", name: "URL_DOMAIN", x: 741, y: 209, type: "final", label: "q22" },
      "30": { id: "q30", name: "HASHTAG_START", x: 699, y: 327, label: "q30" },
      "31": { id: "q31", name: "VALID_HASHTAG", x: 936, y: 359, type: "final", label: "q31" },
      "40": { id: "q40", name: "MENTION_START", x: 814, y: 410, label: "q40" },
      "41": { id: "q41", name: "VALID_MENTION", x: 995, y: 464, type: "final", label: "q41" },
      
      // Emoticon States (Right)
      "50": { id: "q50", name: "EMOTICON_START", x: 581, y: 472, label: "q50" },
      "51": { id: "q51", name: "EMOTICON_NOSE", x: 728, y: 571, label: "q51" },
      "52": { id: "q52", name: "VALID_EMOTICON", x: 844, y: 518, type: "final", label: "q52" },
      
      // Emoji States (Bottom)
      "60": { id: "q60", name: "EMOJI_START", x: 245, y: 615, label: "q60" },
      "61": { id: "q61", name: "BASIC_EMOJI", x: 285, y: 707, type: "final", label: "q61" },
      "62": { id: "q62", name: "SKIN_TONE", x: 252, y: 849, label: "q62" },
      "63": { id: "q63", name: "MODIFIED_EMOJI", x: 132, y: 668, type: "final", label: "q63" },
      
      // Error States (Bottom)
      "98": { id: "q98", name: "ERROR_RECOVERY", x: 582, y: 719, label: "q98" },
      "99": { id: "99", name: "ERROR", x: 452, y: 756, type: "final", label: "q99" }
    },
  
    transitions: {
        // Combined START state transitions (fixing duplicate "0" key)
        "0": {
            // Grammar
            "a-z A-Z": ["1"],
            "A-Z": ["5"],
            ", . ! ? ; :": ["8"],
            // Web Content
            "h": ["20"],
            "#": ["30"],
            "@": ["40"],
            // Emoticons & Emojis
            ": ;": ["50"],
            "U+1F300-1F9FF": ["60"]
        },

        // Grammar Transitions (existing)
        "1": { "a-z A-Z": ["2"] },
        "2": { "space": ["3", "0"] },
        "3": { "a-z A-Z": ["4"] },
        "4": { "space": ["0"] },  // Added return to START
        "5": { "a-z A-Z space": ["6"] },
        "6": { ". ! ?": ["7"] },
        "7": { "space": ["0"] },  // Added return to START
        "8": { "space": ["0"] },  // Added return to START

        // Web Content Transitions (existing + returns)
        "20": { "t p : /": ["21"] },
        "21": { "a-z A-Z . /": ["22"] },
        "22": { "space": ["0"] },  // Added return to START
        "30": { "a-z A-Z 0-9": ["31"] },
        "31": { "space": ["0"] },  // Added return to START
        "40": { "a-z A-Z 0-9": ["41"] },
        "41": { "space": ["0"] },  // Added return to START

        // Emoticon Transitions (with error handling)
        "50": {
            "-": ["51"],
            ") ( D P": ["52"],
            "space ! @ # $ %": ["99"]  // Added error transition
        },
        "51": { 
            ") ( D P": ["52"],
            "space ! @ # $ %": ["99"]  // Added error transition
        },
        "52": { "space": ["0"] },  // Added return to START

        // Emoji Transitions (with error handling)
        "60": { 
            "U+1F600-1F64F": ["61"],
            "space ! @ # $ %": ["99"]  // Added error transition
        },
        "61": { 
            "U+1F3FB-1F3FF": ["62"],
            "space": ["0"]  // Added return to START
        },
        "62": { 
            "U+1F600-1F64F": ["63"],
            "space ! @ # $ %": ["99"]  // Added error transition
        },
        "63": { "space": ["0"] },  // Added return to START

        // Error Handling (existing)
        "98": { "space": ["0"] },
        "99": { "space ! . ? @ # $ %": ["98"] }
    },

    // Added metadata for visualization
    metadata: {
        name: "Web Content Tokenizer Automaton",
        type: "fa",
        description: "Finite Automaton for tokenizing web content including grammar, URLs, hashtags, mentions, emoticons, and emojis"
    }
  };