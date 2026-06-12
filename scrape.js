const https = require('https');
const fs = require('fs');
const path = require('path');

const shortcodes = [
  "DXBwaGAjEDZ",
  "DWJ1lq5DKS2",
  "DT-CmqdjKJ-",
  "DNW6bFEI2qs",
  "DEkiJrHSFJD"
];

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchHtml(res.headers.location).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function scrape() {
  const allData = {};
  for (const code of shortcodes) {
    console.log(`\n--- Fetching HTML for ${code}... ---`);
    try {
      const html = await fetchHtml(`https://www.instagram.com/p/${code}/embed/captioned/`);
      
      // Use /s flag to allow dot to match newlines
      const regex = /window\.__additionalDataLoaded\('extra',\s*({.*?})\);<\/script>/s;
      const match = html.match(regex);
      
      if (match) {
        // Because the HTML has backslashes escaped in strings, we parse it
        const jsonStr = match[1];
        const json = JSON.parse(jsonStr);
        const media = json.shortcode_media;
        
        let urls = [];
        if (media.edge_sidecar_to_children) {
          urls = media.edge_sidecar_to_children.edges.map(e => e.node.display_url);
        } else if (media.display_url) {
          urls = [media.display_url];
        }
        
        console.log(`Found ${urls.length} images for ${code}`);
        allData[code] = { images: [] };
        
        for (let i = 0; i < urls.length; i++) {
          const filename = `insta-${code}-${i}.jpg`;
          const filepath = path.join(__dirname, 'public', filename);
          console.log(`Downloading ${filename}...`);
          try {
            await downloadImage(urls[i], filepath);
            allData[code].images.push(filename);
          } catch(e) {
            console.error(`Failed to download ${filename}: ${e.message}`);
          }
        }
      } else {
        console.log(`No JSON found for ${code}. Fallback parsing...`);
      }
    } catch (e) {
      console.error(`Failed ${code}:`, e.message);
    }
  }
  
  fs.writeFileSync(path.join(__dirname, 'public', 'insta-data.json'), JSON.stringify(allData, null, 2));
  console.log("Done scraping!");
}

scrape();
