module.exports = {
  purge: {
    enabled: false,
    content: ["./views/**/*.ejs"],
    
  },
  purge:[

  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      maxHeight: ["focus"],
    },
  },
  plugins: [],
};
