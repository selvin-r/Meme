const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
const imageUrl = document.getElementById('imageUrl');
const loadUrlBtn = document.getElementById('loadUrlBtn');
const topText = document.getElementById('topText');
const bottomText = document.getElementById('bottomText');
const topTextColor = document.getElementById('topTextColor');
const bottomTextColor = document.getElementById('bottomTextColor');
const topTextSize = document.getElementById('topTextSize');
const bottomTextSize = document.getElementById('bottomTextSize');
const topTextFont = document.getElementById('topTextFont');
const bottomTextFont = document.getElementById('bottomTextFont');
const clearBtn = document.getElementById('clearBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvasPlaceholder = document.getElementById('canvasPlaceholder');
const presetImages = document.querySelectorAll('.preset-img');
 const ratingElement = document.getElementById("ratingValue");

let currentImage = null;




imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            loadImage(event.target.result);
        };
        reader.readAsDataURL(file);
    }
});


loadUrlBtn.addEventListener('text-input', () => {
    const url = imageUrl.value.trim();
    if (url) {
        loadImage(url);
    }
});

loadUrlBtn.addEventListener('click', () => {
    const url = imageUrl.value.trim();
    if (url) {
        loadImage(url);
    }
});

imageUrl.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const url = imageUrl.value.trim();
        if (url) {
            loadImage(url);
        }
    }
});


function loadImage(src) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        currentImage = img;
        updateCanvas();
        canvasPlaceholder.classList.remove('active');
    };
    img.onerror = () => {
        alert('Failed to load image. Please check the URL or try another image.');
    };
    img.src = src;
}


function updateCanvas() {
    if (!currentImage) {
        canvasPlaceholder.classList.add('active');
        return;
    }


    canvas.width = currentImage.width;
    canvas.height = currentImage.height;

    
    ctx.drawImage(currentImage, 0, 0);

    if (topText.value) {
        drawText(topText.value, 'top');
    }

  
    if (bottomText.value) {
        drawText(bottomText.value, 'bottom');
    }
}




function drawText(text, position) {
    const fontSize = position === 'top' ? parseInt(topTextSize.value) : parseInt(bottomTextSize.value);
    const fontFamily = position === 'top' ? topTextFont.value : bottomTextFont.value;
    const color = position === 'top' ? topTextColor.value : bottomTextColor.value;

    ctx.font = `bold ${fontSize}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = fontSize / 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = position === 'top' ? 'top' : 'bottom';

    const x = canvas.width / 2;
    const y = position === 'top' ? 20 : canvas.height - 20;


    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}


topText.addEventListener('input', updateCanvas);
bottomText.addEventListener('input', updateCanvas);
topTextColor.addEventListener('input', updateCanvas);
bottomTextColor.addEventListener('input', updateCanvas);
topTextSize.addEventListener('input', updateCanvas);
bottomTextSize.addEventListener('input', updateCanvas);
topTextFont.addEventListener('change', updateCanvas);
bottomTextFont.addEventListener('change', updateCanvas);


clearBtn.addEventListener('click', () => {
    topText.value = '';
    bottomText.value = '';
    updateCanvas();
});


downloadBtn.addEventListener('click', () => {
    if (!currentImage) {
        alert('Please upload an image first!');
        return;
    }

    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL();
    link.click();
});

presetImages.forEach((img, index) => {
    img.addEventListener('click', () => {
     
        const presetUrls = [
            'https://via.placeholder.com/800x600/333333/ffffff?text=Template+1',
            'https://via.placeholder.com/800x600/333333/ffffff?text=Template+2',
            'https://via.placeholder.com/800x600/333333/ffffff?text=Template+3',
            'https://via.placeholder.com/800x600/333333/ffffff?text=Template+4'
        ];
        loadImage(presetUrls[index]);
    });
});


   ratingElement.parentElement.addEventListener("click", () => {
      let rating = parseFloat(ratingElement.innerText);
      if (rating < 5) {
        rating += 0.1; 
        rating = Math.min(rating, 5.0); 
        ratingElement.innerText = rating.toFixed(1);
      } else {
        alert("🌟 Maximum rating reached (5.0)");
      }
    });

canvasPlaceholder.classList.add('active');
