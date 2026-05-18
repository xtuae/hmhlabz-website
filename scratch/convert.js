const fs = require('fs');

function styleToDict(styleStr) {
  if (!styleStr) return "{}";
  const parts = styleStr.split(';');
  let dict = [];
  for (let p of parts) {
    let colonIdx = p.indexOf(':');
    if (colonIdx === -1) {
      if (p.includes('base64,')) {
        // Handle the broken data uri from split
        dict[dict.length - 1] += ';' + p.trim();
      }
      continue;
    }
    let k = p.slice(0, colonIdx).trim();
    let v = p.slice(colonIdx + 1).trim();
    if (!k || !v) continue;
    
    // camelCase the key
    k = k.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    
    dict.push(`${k}: '${v}'`);
  }
  return `{{ ${dict.join(', ')} }}`;
}

function convertHtmlToJsx(html) {
  let jsx = html;
  
  // Extract main tag
  let mainMatch = jsx.match(/<main>([\s\S]*?)<\/main>/);
  if (mainMatch) {
    jsx = mainMatch[0];
  }

  // Replace class with className
  jsx = jsx.replace(/class="/g, 'className="');
  
  // Replace style inline
  jsx = jsx.replace(/style="([^"]*)"/g, function(match, styleStr) {
    return 'style=' + styleToDict(styleStr);
  });
  
  // Replace SVG attributes
  const svgAttrs = ['stroke-width', 'stroke-linecap', 'stroke-linejoin', 'fill-rule', 'clip-rule', 'stroke-miterlimit', 'stroke-dasharray', 'stroke-dashoffset', 'text-anchor', 'view-box', 'font-family', 'font-size', 'letter-spacing'];
  for (let attr of svgAttrs) {
    let camelAttr = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
    let regex = new RegExp(`${attr}="([^"]*)"`, 'g');
    jsx = jsx.replace(regex, `${camelAttr}="$1"`);
  }
  
  // Fix viewBox specifically since it's viewBox, not view-box in the html but we should check.
  // wait, html is viewBox="0 0 400 300". The camelCasing will not touch it. Wait, preserveAspectRatio might become lowercase by bs4? We are reading raw file.
  
  // Handle self closing tags
  const selfClosing = ['br', 'hr', 'rect', 'circle', 'line', 'path', 'polygon', 'img', 'input'];
  for (let tag of selfClosing) {
    // If it has a closing tag like </rect>, we can leave it. React accepts <rect></rect>.
    // But <br>, <hr> should be self closing.
    let regex = new RegExp(`<(${tag})([^>]*)>`, 'g');
    jsx = jsx.replace(regex, function(match, t, attrs) {
      if (attrs.endsWith('/')) return match; // already self closing
      return `<${t}${attrs} />`;
    });
    // Remove </br> or </hr> if they exist
    jsx = jsx.replace(new RegExp(`</${tag}>`, 'g'), '');
  }
  
  return jsx;
}

try {
  const html = fs.readFileSync('/Volumes/Mac-HMH/Desktop/hmhlabz-new/html/about_decoded.html', 'utf8');
  const jsx = convertHtmlToJsx(html);
  fs.writeFileSync('/Volumes/Mac-HMH/Desktop/hmhlabz-new/scratch/converted.jsx', jsx);
  console.log("Success!");
} catch (e) {
  console.error("Error:", e);
}
