import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiCopy, FiTrash2 } from 'react-icons/fi';
import { glowStyles, gradientAnimation } from '../utils/styles';
import { useTokenizer } from '../context/TokenizerContext';

const TokenInput = () => {
  const { tokenize, currentState } = useTokenizer();
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenizeStatus, setTokenizeStatus] = useState(null);

  const handleClear = () => setInput('');
  const handleCopy = () => navigator.clipboard.writeText(input);

  // Improved prepareUnicode function with better email and URL handling
  const prepareUnicode = (text) => {
    // First, normalize the input for consistent Unicode handling
    text = text.normalize('NFC');
    
    // Improved token protection function with more accurate patterns
    const protectToken = (input) => {
      // Check if input is a pure number
      if (/^\d+$/.test(input)) {
        return true;
      }
      
      // Check for hashtags
      if (/^#[\w_]+$/.test(input)) {
        return true;
      }
      
      // Check for mentions
      if (/^@[\w_]+$/.test(input)) {
        return true;
      }
      
      // Better URL pattern with improved matching
      if (/^https?:\/\/[^\s]+$/i.test(input)) {
        return true;
      }
      
      // Simplified email pattern that still captures valid emails
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input)) {
        return true;
      }
      
      return false;
    };
    
    // Directly return protected token types
    if (protectToken(text)) {
      return text;
    }
    
    // For emoji and emoticon handling, use the approach that worked before
    // Step 1: Preserve complete Unicode patterns
    const preserveUnicode = (input) => {
      // Match complete Unicode patterns
      const unicodeRegex = /U\+[0-9A-F]{4,6}/g;
      const matches = input.match(unicodeRegex) || [];
      
      // Replace incomplete patterns with complete ones
      matches.forEach(match => {
        const incomplete = match.replace(/([0-9A-F])(?=[0-9A-F]{3})/g, '$1');
        if (incomplete !== match) {
          input = input.replace(incomplete, match);
        }
      });
      
      return input;
    };

    // Step 2: Process text word by word with improved token recognition
    const words = text.split(/\s+/);
    const processedWords = words.map(word => {
      // Skip processing for emoji characters
      const hasEmoji = Array.from(word).some(char => /\p{Emoji}/u.test(char));
      
      // Improved check for special tokens
      // Check each token type individually for clearer logic
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(word);
      const isUrl = /^https?:\/\/[^\s]+$/i.test(word);
      const isHashtag = /^#[\w_]+$/.test(word);
      const isMention = /^@[\w_]+$/.test(word);
      const isNumber = /^\d+$/.test(word);
      
      // If it's a special token, preserve it
      if (!hasEmoji && (isEmail || isUrl || isHashtag || isMention || isNumber)) {
        return word; // Keep protected tokens as-is
      }
      
      // Process emoji characters normally
      return Array.from(word).map(char => {
        if (/\p{Emoji}/u.test(char)) {
          const codePoint = char.codePointAt(0);
          return `U+${codePoint.toString(16).toUpperCase()}`;
        }
        return char;
      }).join('');
    });
    
    // Recombine text and clean up
    text = processedWords.join(' ');
    text = preserveUnicode(text);
    
    // Final cleanup
    text = text.replace(/\s+/g, ' ').trim();

    return text;
  };

  const handleTokenize = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setTokenizeStatus(null);
    try {
      // Improved token detection logic with more specific checks
      const trimmedInput = input.trim();
      
      // Check for pure numbers first
      if (/^\d+$/.test(trimmedInput)) {
        await tokenize(trimmedInput);
      } 
      // Check for hashtags
      else if (/^#[\w_]+$/.test(trimmedInput)) {
        await tokenize(trimmedInput);
      } 
      // Check for mentions
      else if (/^@[\w_]+$/.test(trimmedInput)) {
        await tokenize(trimmedInput);
      } 
      // Check for URLs (with improved pattern)
      else if (/^https?:\/\/[^\s]+$/i.test(trimmedInput)) {
        await tokenize(trimmedInput);
      } 
      // Check for emails (with simplified but effective pattern)
      else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedInput)) {
        await tokenize(trimmedInput);
      } 
      // For any other input, use the prepareUnicode function
      else {
        const preparedInput = prepareUnicode(trimmedInput);
        console.log('Prepared input:', preparedInput); // Debug log
        await tokenize(preparedInput);
      }
      
      setTokenizeStatus('success');
    } catch (error) {
      console.error('Tokenization error:', error);
      setTokenizeStatus('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setTokenizeStatus(null), 2000);
    }
  };

  // Enhanced button variants
  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.02,
      boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.98,
      boxShadow: '0 0 10px rgba(236, 72, 153, 0.2)',
      transition: { duration: 0.1 }
    }
  };

  // Add this after buttonVariants
  const iconVariants = {
    idle: { x: 0 },
    hover: {
      x: [0, 5, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    loading: {
      rotate: 360,
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative backdrop-blur-xl bg-[#1A1F2B]/70 p-6 rounded-2xl border border-[#EC4899]/20 
                 hover:border-[#EC4899]/30 transition-all duration-300 h-[600px] flex flex-col"
      style={glowStyles}
    >
      {/* Header with status indicator */}
      <div className="flex items-center justify-between mb-4">
        <motion.h3 
          className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6]"
          style={gradientAnimation}
        >
          <div className="flex items-center gap-2">
            Input Text
          </div>
        </motion.h3>
        
        {/* Existing buttons */}
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="p-2 text-gray-400 hover:text-[#EC4899] transition-colors rounded-lg"
          >
            <FiCopy size={18} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(236, 72, 153, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClear}
            className="p-2 text-gray-400 hover:text-[#EC4899] transition-colors rounded-lg"
          >
            <FiTrash2 size={18} />
          </motion.button>
        </div>
      </div>

      {/* Enhanced TextArea Container */}
      <motion.div 
        className="relative group flex-grow"
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        <textarea
          className="w-full p-4 h-full bg-[#0D1117]/80 text-gray-200 rounded-xl border border-[#EC4899]/20 
                   focus:border-[#EC4899]/50 focus:ring-2 focus:ring-[#EC4899]/20 
                   transition-all duration-300 resize-none backdrop-blur-sm
                   group-hover:border-[#EC4899]/30 font-mono tracking-wide"
          placeholder="Enter text to tokenize... (Try emoji like 😊)"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            // Auto-complete Unicode patterns without breaking non-Unicode text
            const completeUnicode = value.replace(
              /U\+([0-9A-F]{1,5})(?!\w)/g,
              (match, group) => {
                // Only modify patterns that are proper Unicode patterns
                if (match.startsWith('U+')) {
                  // Pad with zeros to ensure 4-6 characters
                  const padded = group.padEnd(4, '0');
                  return `U+${padded}`;
                }
                return match;
              }
            );
            setInput(completeUnicode);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          lang="en"
          dir="auto"
          // Add these properties for better Unicode handling
          accept="text/plain;charset=UTF-8"
          inputMode="text"
        />
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-4 right-4 text-sm text-gray-500/80 bg-[#0D1117]/50 
                     px-2 py-1 rounded-md backdrop-blur-sm border border-[#EC4899]/10"
        >
          {input.length} characters
        </motion.div>
      </motion.div>

      {/* Enhanced Tokenize Button */}
      <motion.button
        variants={buttonVariants}
        initial="idle"
        whileHover="hover"
        whileTap="tap"
        disabled={isLoading}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={handleTokenize}
        className="mt-4 w-full group relative inline-flex items-center justify-center px-8 py-3 
                 rounded-xl overflow-hidden transition-all duration-300 disabled:opacity-70"
      >
        {/* Gradient Background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#3B82F6] to-[#8B5CF6]"
          initial={{ backgroundPosition: '0% 50%' }}
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          style={{
            backgroundSize: '300% 300%'
          }}
        />
        
        {/* Button Content */}
        <div className="relative flex items-center gap-2 text-white font-medium">
          <motion.div
            variants={iconVariants}
            animate={isLoading ? "loading" : isHovered ? "hover" : "idle"}
          >
            {isLoading ? (
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full 
                           shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            ) : (
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <FiPlay 
                  size={18} 
                  className={`transform transition-transform duration-300
                             ${isHovered ? 'translate-x-0.5' : ''}`}
                />
              </motion.div>
            )}
          </motion.div>
          <span className="relative">
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              animate={{ 
                opacity: isLoading ? 0 : 1,
                y: isLoading ? 10 : 0
              }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              Tokenize
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ 
                opacity: isLoading ? 1 : 0,
                y: isLoading ? 0 : -10
              }}
              transition={{ duration: 0.2 }}
            >
              Tokenizing...
            </motion.span>
          </span>
        </div>
      </motion.button>
    </motion.div>
  );
};

export default TokenInput;