
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const downloadCodeAsZip = async (html: string, css: string, js: string) => {
  try {
    const zip = new JSZip();
    
    // Add files to the zip
    zip.file("index.html", generateFullHtml(html, css, js));
    zip.file("styles.css", css);
    zip.file("script.js", js);
    
    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    
    // Save the file using FileSaver
    saveAs(content, "code-project.zip");
  } catch (error) {
    console.error("Error creating zip file:", error);
  }
};

// Create a complete HTML file that includes the CSS and JS
const generateFullHtml = (html: string, css: string, js: string): string => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Code Project</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
${html}
  <script src="script.js"></script>
</body>
</html>`;
};
