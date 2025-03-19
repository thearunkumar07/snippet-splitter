
interface CompileOptions {
  html: string;
  css: string;
  js: string;
}

export const compileCode = ({ html, css, js }: CompileOptions): string => {
  // Create a full HTML document that includes the HTML, CSS, and JavaScript
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    // Wrap in IIFE to avoid global scope pollution
    (function() {
      try {
        ${js}
      } catch (error) {
        console.error('Runtime error:', error);
        
        const errorElement = document.createElement('div');
        errorElement.style.color = 'red';
        errorElement.style.padding = '10px';
        errorElement.style.fontFamily = 'monospace';
        errorElement.style.whiteSpace = 'pre-wrap';
        errorElement.style.position = 'fixed';
        errorElement.style.bottom = '0';
        errorElement.style.left = '0';
        errorElement.style.right = '0';
        errorElement.style.background = 'rgba(255, 220, 220, 0.9)';
        errorElement.style.borderTop = '2px solid red';
        errorElement.style.zIndex = '1000';
        errorElement.textContent = 'JavaScript Error: ' + error.message;
        
        document.body.appendChild(errorElement);
      }
    })();
  </script>
</body>
</html>
  `;
};

// Default starter code templates
export const DEFAULT_HTML = `<div class="container">
  <h1>Hello World</h1>
  <p>Start coding to see the magic happen!</p>
  <button id="clickMe">Click me</button>
</div>`;

export const DEFAULT_CSS = `body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, 
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  margin: 0;
  padding: 20px;
  color: #333;
  transition: all 0.3s ease;
}

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background: white;
}

h1 {
  color: #2563eb;
  margin-top: 0;
}

button {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

button:hover {
  background-color: #1d4ed8;
  transform: translateY(-2px);
}`;

export const DEFAULT_JS = `// Get the button element
const button = document.getElementById('clickMe');

// Add an event listener to the button
button.addEventListener('click', function() {
  // Create a new element
  const newElement = document.createElement('p');
  newElement.textContent = 'You clicked the button!';
  newElement.style.color = '#2563eb';
  
  // Add it to the container
  document.querySelector('.container').appendChild(newElement);
  
  // Add a little animation
  newElement.style.opacity = '0';
  setTimeout(() => {
    newElement.style.transition = 'opacity 0.5s ease';
    newElement.style.opacity = '1';
  }, 10);
});

console.log('JavaScript loaded successfully!');`;
