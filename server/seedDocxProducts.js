const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
require('./config/cloudinary').cloudinaryConnect();
const Product = require('./models/productModel');

const folderName = process.env.FOLDER_NAME || 'Welkin';

async function uploadFile(filename) {
  const filePath = path.join(__dirname, 'extracted_images', filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return null;
  }
  try {
    const res = await cloudinary.uploader.upload(filePath, {
      folder: folderName,
      resource_type: 'auto'
    });
    console.log(`Uploaded ${filename} -> ${res.secure_url}`);
    return res.secure_url;
  } catch (err) {
    console.error(`Error uploading ${filename}:`, err.message);
    return null;
  }
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('Connected to MongoDB!');

  console.log('Uploading all extracted images to Cloudinary...');
  const uploadedUrls = {};
  for (let i = 1; i <= 14; i++) {
    const filename = `image${i}.jpeg`;
    uploadedUrls[filename] = await uploadFile(filename);
  }

  console.log('All image uploads finished:', uploadedUrls);

  const fallbackSunblock = uploadedUrls['image8.jpeg'] || uploadedUrls['image1.jpeg'];

  const productsData = [
    {
      title: 'SUN BLOCK Lotion SPF 50',
      slug: 'sun-block-lotion-spf-50',
      type: 'Sunscreen',
      category: ['Anti-Aging', 'Hydrating', 'Sensitive Skin'],
      mrp: 750,
      sellingPrice: 650,
      images: [uploadedUrls['image8.jpeg'] || fallbackSunblock],
      skinSuitability: '<ul><li>Suitable for all skin types</li><li>Sensitive skin</li><li>Outdoor & Sports protection</li></ul>',
      ingredients: [
        'Octinoxate',
        'Avobenzone',
        'Oxybenzone',
        'Zinc Oxide',
        'Aloe Vera',
        'Vitamin E',
        'Shea Butter'
      ],
      keyBenefits: '<p><strong>High UV Protection:</strong> The SPF 50 formula blocks up to 98% of UVB rays, shielding your skin from severe sunburn and redness.</p><p><strong>Broad Spectrum Defense:</strong> It protects against both UVA and UVB rays to prevent tanning, long-term skin darkening, and deep cellular damage.</p><p><strong>Anti-Aging Effects:</strong> Guards your skin against premature aging, fine lines, wrinkles, and sunspots.</p><p><strong>Sweat and Water Resistant:</strong> Formulation resists washing away easily, making it reliable for outdoors, swimming, or sports.</p><p><strong>Lightweight, Non-Greasy Texture:</strong> Absorbs rapidly into the skin without sticky or heavy residue.</p><p><strong>All Skin Types:</strong> Explicitly designed to be gentle and compatible for all skin variations.</p>',
      description: '<p>High broad-spectrum SPF 50 sunscreen lotion protecting against 98% UVB and harmful UVA rays. Formulated with skin-nourishing agents Aloe Vera, Vitamin E, and Shea Butter to keep skin hydrated, radiant, and protected.</p>',
      howToUse: '<p>Apply evenly on face, neck, and exposed skin 15-20 minutes before sun exposure. Reapply every 2-3 hours during outdoor activities or after swimming.</p>',
      precataions: '<p>For external use only. Avoid contact with eyes. Discontinue use if irritation occurs.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'TENDOGLAD-C2 ++',
      slug: 'tendoglad-c2-plus-plus',
      type: 'Get The Glow',
      category: ['Anti-Aging', 'Natural Antioxidant'],
      mrp: 1250,
      sellingPrice: 1099,
      images: [uploadedUrls['image1.jpeg']],
      skinSuitability: '<ul><li>Joint stiffness</li><li>Cartilage support</li><li>Active mobility</li><li>Bone health</li></ul>',
      ingredients: [
        'Collagen Peptides Type-II',
        'Glucosamine',
        'Rosehip Extract',
        'Ginger Extract',
        'Vitamin D3',
        'Vitamin C'
      ],
      keyBenefits: '<p><strong>Supports Cartilage Repair:</strong> Collagen Peptides Type-II and Glucosamine provide essential building blocks to regenerate cartilage and preserve structural integrity.</p><p><strong>Reduces Joint Inflammation:</strong> Rosehip and Ginger extracts have natural anti-inflammatory properties that ease swelling and morning stiffness.</p><p><strong>Enhances Bone Strength:</strong> Vitamin D3 aids in calcium absorption to maintain dense bones, while Vitamin C supports native collagen synthesis.</p><p><strong>Improves Mobility:</strong> Joint lubrication reduces friction, resulting in smoother overall physical movement and easier daily functioning.</p>',
      description: '<p>TENDOGLAD-C2 ++ is an advanced nutritional supplement designed for comprehensive cartilage repair, joint lubrication, reduced morning stiffness, and superior bone density.</p>',
      howToUse: '<p>Take as recommended by your physician or healthcare professional.</p>',
      precataions: '<p>Dietary supplement. Not for medicinal use. Store in a cool, dry place out of direct sunlight. Keep out of reach of children.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'CEGLOW 20% Vitamin C Serum',
      slug: 'ceglow-20-vitamin-c-serum',
      type: 'Serum',
      category: ['Brightness Skin', 'Glow Boost', 'Hyperpigmentation', 'Anti Wrinkle', 'Natural Antioxidant'],
      mrp: 1499,
      sellingPrice: 1299,
      images: [uploadedUrls['image2.jpeg']],
      skinSuitability: '<ul><li>Hyperpigmentation & Dark spots</li><li>Dull, uneven skin tone</li><li>Fine lines & wrinkles</li><li>Weak skin barrier</li></ul>',
      ingredients: [
        'Vitamin C 20%',
        'Niacinamide',
        'Hyaluronic Acid',
        'Ceramides'
      ],
      keyBenefits: '<p><strong>Fades Pigmentation:</strong> The 20% Vitamin C and Niacinamide blend works effectively to lighten dark spots, acne scars, and uneven skin tone.</p><p><strong>Boosts Radiant Glow:</strong> Targets dullness by neutralizing free radicals, giving the skin a brighter and more luminous complexion.</p><p><strong>Reduces Fine Lines:</strong> Vitamin C acts as an anti-aging agent by stimulating natural collagen production to firm and tighten the skin.</p><p><strong>Deep Hydration:</strong> Infused with Hyaluronic Acid, it pulls moisture deep into the skin layers to plump and soften textures.</p><p><strong>Strengthens Skin Barrier:</strong> The addition of Ceramides helps lock in moisture while repairing and protecting the skin layer from daily environmental damage.</p>',
      description: '<p>CEGLOW is an advanced antioxidant powerhouse serum combining 20% active Vitamin C, Niacinamide, Hyaluronic Acid, and Ceramides for luminous, firm, and spot-free skin.</p>',
      howToUse: '<p>Apply 3-4 drops onto clean, dry face and neck in the morning and evening. Gently pat until absorbed. Follow with moisturizer and sunscreen during daytime.</p>',
      precataions: '<p>For external use only. Patch test recommended before first application. Avoid direct contact with eyes.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Glosstrix Nourishing Bathing Soap',
      slug: 'glosstrix-nourishing-bathing-soap',
      type: 'Cleanser',
      category: ['Dry Skin', 'Sensitive Skin', 'Hydrating', 'Glow Boost'],
      mrp: 299,
      sellingPrice: 249,
      images: [uploadedUrls['image3.jpeg']],
      skinSuitability: '<ul><li>Dry, dehydrated skin</li><li>Sensitive & irritated skin</li><li>Daily gentle body cleansing</li></ul>',
      ingredients: [
        'Almond Oil',
        'Olive Oil',
        'Shea Butter',
        'Glycerin',
        'Aloe Vera',
        'Lavender',
        'Vitamin E',
        'Vitamin B5 (Panthenol)',
        'Rose Water',
        'Honey'
      ],
      keyBenefits: '<p><strong>Deep Moisturization:</strong> Enriched with Almond Oil, Olive Oil, Shea Butter, and Glycerin to lock in moisture and prevent post-bath dryness.</p><p><strong>Skin Soothing & Repair:</strong> Contains Aloe Vera and Lavender to calm irritation, reduce redness, and soothe sensitive or inflamed skin.</p><p><strong>Barrier Protection:</strong> Vitamin E and Vitamin B5 (Panthenol) offer antioxidant defenses that protect the skin barrier against environmental stressors.</p><p><strong>Gentle Cleansing:</strong> Formulated to thoroughly wash away dirt, excess sebum, and impurities without stripping natural skin lipids.</p><p><strong>Texture Improvement:</strong> Rose Water and Honey help refine skin texture, promoting a softer, smoother, and more supple feel.</p>',
      description: '<p>Glosstrix Soap is a luxury botanical cleansing bar enriched with Almond & Olive oils, Shea butter, Aloe Vera, Lavender, Vitamin E, and Honey for silky-smooth, deeply nourished skin.</p>',
      howToUse: '<p>Lather gently on wet skin during shower or bath. Massage all over body and rinse thoroughly with clean water.</p>',
      precataions: '<p>For external use only. Keep in a dry soap dish after use to prolong bar life.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'GLOISH Depigmentation & Radiance Serum',
      slug: 'gloish-depigmentation-radiance-serum',
      type: 'Serum',
      category: ['Brightness Skin', 'Hyperpigmentation', 'Glow Boost', 'Acne Care'],
      mrp: 1650,
      sellingPrice: 1450,
      images: [uploadedUrls['image4.jpeg'], uploadedUrls['image5.jpeg']].filter(Boolean),
      skinSuitability: '<ul><li>Hyperpigmentation & Melasma</li><li>Acne-prone skin & Blemishes</li><li>Uneven skin tone</li><li>Rough skin texture</li></ul>',
      ingredients: [
        'Glutathione',
        'Azelaic Acid',
        'HPPA',
        'Zinc PCA',
        'Hyaluronic Acid',
        'Ferulic Acid',
        'Niacinamide'
      ],
      keyBenefits: '<p><strong>Fades Dark Spots:</strong> Helps reduce hyperpigmentation, patchy discoloration, and post-acne marks.</p><p><strong>Evens Skin Tone:</strong> Glutathione and HPPA work synergistically to brighten complexion and balance skin tone.</p><p><strong>Regulates Sebum & Fights Acne:</strong> Zinc PCA regulates sebum production while Azelaic Acid clears clogged pores and reduces redness & inflammation.</p><p><strong>Deep Hydration:</strong> Hyaluronic Acid delivers deep, lasting hydration, keeping skin plump and supple.</p><p><strong>Antioxidant Protection:</strong> Ferulic Acid and Glutathione act as potent antioxidant shields against environmental stressors and oxidative damage.</p><p><strong>Smooths Texture:</strong> Niacinamide smooths texture and refines the appearance of pores.</p>',
      description: '<p>GLOISH Serum is a multi-action brightening and depigmenting treatment formulated with Glutathione, Azelaic Acid, HPPA, and Zinc PCA to visibly fade stubborn dark spots and promote a luminous glow.</p>',
      howToUse: '<p>Apply a few drops to clean, dry face. Gently massage until absorbed. Shake well before use.</p>',
      precataions: '<p>FOR EXTERNAL USE ONLY • DO NOT FREEZE. Storage: Store in a cool & dry place. Keep this product out of reach of children. Shake well before use.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'GLIXO AHA BHA Exfoliating Serum',
      slug: 'glixo-aha-bha-exfoliating-serum',
      type: 'Exfoliation',
      category: ['Acne Care', 'Oily Skin', 'Hyperpigmentation', 'Brightness Skin'],
      mrp: 1399,
      sellingPrice: 1199,
      images: [uploadedUrls['image6.jpeg']],
      skinSuitability: '<ul><li>Oily & Acne-prone skin</li><li>Congested & Enlarged pores</li><li>Dark marks & Sun damage</li><li>Rough, bumpy texture</li></ul>',
      ingredients: [
        'Glycolic Acid (AHA)',
        'Lactic Acid (AHA)',
        'Salicylic Acid (BHA)'
      ],
      keyBenefits: '<p><strong>Deeply Exfoliates:</strong> Alpha Hydroxy Acids (AHAs) Glycolic and Lactic Acid dissolve dead skin cell bonds to uncover smoother surface skin.</p><p><strong>Clears Breakouts:</strong> Beta Hydroxy Acid (BHA) Salicylic Acid is oil-soluble, penetrating deep into pores to remove excess sebum and prevent acne.</p><p><strong>Fades Hyperpigmentation:</strong> Accelerates surface cell turnover to lighten dark marks, acne scars, sun damage, and uneven dark patches.</p><p><strong>Smooths & Refines Texture:</strong> Polishes rough skin patches and noticeably shrinks the visual appearance of enlarged pores.</p><p><strong>Boosts Hydration & Radiance:</strong> Lactic Acid acts as a natural humectant, pulling moisture into the skin barrier to keep it plump, glowy, and hydrated.</p>',
      description: '<p>GLIXO Serum is an advanced AHA + BHA resurfacing formula combining Glycolic, Lactic, and Salicylic acids to gently peel away dead skin, unclog pores, and restore ultra-smooth texture.</p>',
      howToUse: '<p>Apply a few drops on cleansed, dry face at night. Use 2-3 times weekly. Follow with moisturizer and always wear sunscreen during the daytime.</p>',
      precataions: '<p>For external use only. Use sunscreen daily. Avoid contact with eyes and broken skin. Discontinue if excessive irritation occurs.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Winscar Advanced Scar & Dark Spot Gel',
      slug: 'winscar-advanced-scar-and-dark-spot-gel',
      type: 'Cream',
      category: ['Sensitive Skin', 'Hyperpigmentation', 'Anti-Aging'],
      mrp: 850,
      sellingPrice: 720,
      images: [uploadedUrls['image7.jpeg']],
      skinSuitability: '<ul><li>Hypertrophic scars & Keloids</li><li>Post-surgery incision lines</li><li>Post-acne dark marks</li><li>Burn marks & Stretch marks</li></ul>',
      ingredients: [
        'Advanced Scar Repair Complex',
        'Regenerative Polypeptides',
        'Botanical Soothing Extract'
      ],
      keyBenefits: '<p><strong>Scar Reduction & Fading:</strong> Significantly diminishes the visibility, height, and thickness of various types of scars, including hypertrophic (raised) scars, keloids, and surgical incision lines.</p><p><strong>Post-Acne Dark Spots:</strong> Helps lighten hyperpigmentation, uneven tone, and persistent dark spots remaining after severe acne breakouts.</p><p><strong>Injury & Burn Management:</strong> Accelerates overall skin regeneration while boosting skin elasticity following thermal burns, cuts, scratches, or stretch marks.</p><p><strong>Soothing Inflammation:</strong> Effectively targets and lowers localized swelling, deep redness (erythema), and associated skin discomfort surrounding a healing lesion.</p>',
      description: '<p>Winscar Gel is a clinically formulated topical silicone and active peptide scar management gel that visibly flattens raised scars, speeds recovery, and fades dark blemish marks.</p>',
      howToUse: '<p>Clean and dry the scar area. Apply a thin layer of Winscar gel 2-3 times daily. Allow to dry before applying makeup or sunscreen.</p>',
      precataions: '<p>For external use only. Do not use on open, bleeding, or unhealed wounds. Avoid contact with eyes.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'SUN SHEER Matte Sunscreen Lotion SPF 50+ PA+++',
      slug: 'sun-sheer-matte-sunscreen-lotion-spf-50-pa-plus',
      type: 'Sunscreen',
      category: ['Oily Skin', 'Anti-Aging', 'Hydrating'],
      mrp: 899,
      sellingPrice: 799,
      images: [uploadedUrls['image8.jpeg']],
      skinSuitability: '<ul><li>Oily & Combination skin</li><li>Acne-prone skin</li><li>High sun exposure</li><li>Humid environments</li></ul>',
      ingredients: [
        'Broad-Spectrum UV Filters',
        'Oil-Free Mattifying Base',
        'Hydrating Shield Complex'
      ],
      keyBenefits: '<p><strong>High Broad-Spectrum Protection:</strong> Offers SPF 50+ defense against sunburn-inducing UVB rays, alongside PA+++ protection to block deep-penetrating UVA rays responsible for premature skin aging, wrinkles, and dark spots.</p><p><strong>Matte, Shine-Free Finish:</strong> Formulated as an oil-free lotion, it absorbs quickly to provide a clean, non-greasy matte finish ideal for oily and combination skin types.</p><p><strong>Water Resistant Barrier:</strong> Designed to remain active and resistant to water and sweat, ensuring durable protection during humid conditions or outdoor activities.</p><p><strong>Hydration Balance:</strong> Lightweight shield that locks in moisture, leaving the skin soft and smooth without feeling heavy or clogging pores.</p>',
      description: '<p>SUN SHEER delivers ultra-lightweight, high-performance SPF 50+ PA+++ sun protection with a shine-free matte finish designed specifically for oily and combination skin types.</p>',
      howToUse: '<p>Apply generously on clean face and exposed skin 15 minutes before sun exposure. Reapply every 2 to 3 hours when outdoors or after swimming.</p>',
      precataions: '<p>For external use only. Avoid contact with eyes. Store in a cool, dry place.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Reti Age Retinol & Matrixyl 3000 Serum',
      slug: 'reti-age-retinol-matrixyl-3000-serum',
      type: 'Serum',
      category: ['Anti-Aging', 'Anti Wrinkle', 'Brightness Skin', 'Glow Boost'],
      mrp: 1850,
      sellingPrice: 1599,
      images: [uploadedUrls['image9.jpeg']],
      skinSuitability: '<ul><li>Fine lines & deep wrinkles</li><li>Loss of firmness & elasticity</li><li>Sagging facial contours</li><li>Age spots & dull complexion</li></ul>',
      ingredients: [
        'Retinol',
        'Matrixyl 3000 Peptide Complex',
        'Hyaluronic Acid',
        'Skin Barrier Ceramides'
      ],
      keyBenefits: '<p><strong>Reduces Fine Lines & Wrinkles:</strong> Retinol accelerates cellular turnover to smooth out skin texture, while Matrixyl 3000 signals the skin to rebuild deep structural layers.</p><p><strong>Boosts Collagen & Elastin:</strong> Peptides within Matrixyl 3000 stimulate structural proteins to restore density, bounce, and overall firmness.</p><p><strong>Improves Skin Elasticity:</strong> The synergistic effect of both ingredients prevents and lifts sagging facial contours.</p><p><strong>Evens Skin Tone & Luminosity:</strong> Helps fade hyperpigmentation, smooth dark spots, and correct overall dullness for a brighter complexion.</p><p><strong>Provides Smarter Collagen Remodeling:</strong> Combining peptides with retinoids yields stronger, accelerated anti-aging results compared to using retinol alone, with reduced irritation.</p>',
      description: '<p>Reti Age is a cutting-edge anti-aging treatment combining Retinol and Matrixyl 3000 peptides to stimulate collagen remodeling, reduce deep wrinkles, and firm skin contours.</p>',
      howToUse: '<p>Apply 2-3 drops to clean, dry face and neck at night. Follow with a rich moisturizer. Use sunscreen daily.</p>',
      precataions: '<p>For external use only. Do not use during pregnancy or breastfeeding without consulting a doctor. Avoid sun exposure without SPF.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Amor Pigmentation Correcting Serum',
      slug: 'amor-pigmentation-correcting-serum',
      type: 'Serum',
      category: ['Hyperpigmentation', 'Brightness Skin', 'Glow Boost'],
      mrp: 1550,
      sellingPrice: 1350,
      images: [uploadedUrls['image10.jpeg']],
      skinSuitability: '<ul><li>Melasma & Sun spots</li><li>Post-inflammatory hyperpigmentation</li><li>Uneven melanin distribution</li><li>Rough & dull skin</li></ul>',
      ingredients: [
        'Advanced Melanin Regulating Complex',
        'Alpha Arbutin',
        'Kojic Acid',
        'Niacinamide'
      ],
      keyBenefits: '<p><strong>Fades Stubborn Pigmentation:</strong> Reduces melasma, age spots, and sun damage.</p><p><strong>Brightens Acne Scars:</strong> Corrects post-inflammatory hyperpigmentation left by old breakouts.</p><p><strong>Evens Skin Tone:</strong> Balances melanin distribution across the face.</p><p><strong>Smoothes Skin Texture:</strong> Accelerates cell turnover to eliminate rough patches.</p><p><strong>Restores Natural Radiance:</strong> Removes surface-level dead cells to unveil a brighter, glowing complexion.</p>',
      description: '<p>Amor Serum is a targeted corrective therapy for stubborn pigmentation, melasma, and post-acne blemishes that restores natural skin clarity and even glow.</p>',
      howToUse: '<p>Apply 2-3 drops directly to affected areas or whole face in the morning and evening before heavier creams. Always apply daytime SPF.</p>',
      precataions: '<p>For external use only. Patch test recommended. Discontinue if redness or irritation occurs.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Glosstrix Pore Refining Face Wash',
      slug: 'glosstrix-pore-refining-face-wash',
      type: 'Cleanser',
      category: ['Oily Skin', 'Glow Boost', 'Hydrating', 'Brightness Skin'],
      mrp: 450,
      sellingPrice: 380,
      images: [uploadedUrls['image11.jpeg']],
      skinSuitability: '<ul><li>Oily & Combination skin</li><li>Enlarged pores & blackheads</li><li>Daily environmental cleansing</li></ul>',
      ingredients: [
        'Gentle Cleansing Base',
        'Sebum Control Actives',
        'Hydrating Glycerin',
        'Antioxidant Shield Complex'
      ],
      keyBenefits: '<p><strong>Cleanses & Balances Skin Tone:</strong> Purifies daily surface impurities and promotes a more even, uniform complexion.</p><p><strong>Refines Pores & Controls Oil:</strong> Effectively cuts through excess sebum production to clear out, minimize, and tighten facial pores.</p><p><strong>Nourishes & Smoothens:</strong> Restores foundational moisture to flaky or rough surfaces, enhancing tactile skin smoothness.</p><p><strong>All-Day Protection:</strong> Forms a gentle external defense to shield the skin barrier from daily environmental stressors throughout the day.</p>',
      description: '<p>Glosstrix Face Wash is a gentle daily cleanser designed to deeply cleanse impurities, control excess oil, tighten enlarged pores, and leave skin fresh and radiant.</p>',
      howToUse: '<p>Wet face with water. Dispense a small amount, lather into hands, gently massage onto face in circular motions, and rinse thoroughly with water.</p>',
      precataions: '<p>For external use only. Avoid contact with eyes. Rinse immediately if contact occurs.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Aurasalic Salicylic Acid Cleansing Foam',
      slug: 'aurasalic-salicylic-acid-cleansing-foam',
      type: 'Cleanser',
      category: ['Acne Care', 'Oily Skin', 'Sensitive Skin'],
      mrp: 650,
      sellingPrice: 550,
      images: [uploadedUrls['image12.jpeg']],
      skinSuitability: '<ul><li>Active acne & breakouts</li><li>Blackheads & Whiteheads</li><li>Excess oil & shine</li><li>Inflamed blemishes</li></ul>',
      ingredients: [
        'Salicylic Acid (BHA)',
        'Gentle Foaming Complex',
        'Soothing Botanical Extracts'
      ],
      keyBenefits: '<p><strong>Unclogs Pores:</strong> Being oil-soluble, salicylic acid penetrates deep into the pores to dissolve sebum, dirt, and dead cells.</p><p><strong>Controls Excess Oil:</strong> Effectively cuts through stubborn surface oils and targets sebaceous glands to regulate sebum production.</p><p><strong>Combats & Prevents Acne:</strong> By clearing structural pore blockages, it eliminates the breeding grounds for acne-causing bacteria.</p><p><strong>Gently Exfoliates:</strong> Works as a chemical exfoliant to shed the top layer of dead skin cells without the harshness of physical scrubs.</p><p><strong>Reduces Blackheads & Whiteheads:</strong> Regular clearing helps dissolve keratin plugs, directly shrinking existing blackheads and preventing new ones from forming.</p><p><strong>Calms Inflammation:</strong> Inherent anti-inflammatory properties help soothe skin redness, swelling, and irritation caused by active pimples.</p>',
      description: '<p>Aurasalic Cleansing Foam is a powerful BHA salicylic acid foaming wash that deeply decongests clogged pores, stops acne-causing bacteria, and calms redness.</p>',
      howToUse: '<p>Pump 1-2 pumps onto damp hands. Gently massage foam across face for 30-60 seconds avoiding eye area. Rinse thoroughly with lukewarm water.</p>',
      precataions: '<p>For external use only. If dryness or peeling occurs, reduce usage to once daily or every other day.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Claytrix Brightening & Clarifying Clay Face Pack',
      slug: 'claytrix-brightening-clarifying-clay-face-pack',
      type: 'Face Mask',
      category: ['Brightness Skin', 'Hyperpigmentation', 'Hydrating', 'Glow Boost'],
      mrp: 699,
      sellingPrice: 599,
      images: [uploadedUrls['image13.jpeg']],
      skinSuitability: '<ul><li>Dull & fatigued skin</li><li>Pigmentation & acne scars</li><li>Enlarged pores & excess oil</li></ul>',
      ingredients: [
        'Natural Clarifying Clay',
        'Kojic Acid',
        'Hyaluronic Acid',
        'Botanical Brightening Extract'
      ],
      keyBenefits: '<p><strong>Fades Pigmentation & Dark Spots:</strong> The inclusion of Kojic Acid blocks tyrosinase pathways, which prevents melanin overproduction to lighten sun damage, age spots, and acne scars.</p><p><strong>Deep Hydration & Plumping:</strong> Hyaluronic Acid works as a powerful humectant, pulling moisture into the skin barrier to flex skin tissues and reduce the depth of fine lines and wrinkles.</p><p><strong>Deep Cleansing & Pore Refining:</strong> Clarifying properties of clay draw out sebum, bacteria, and external environmental impurities from the pores, visibly tightening enlarged skin texture.</p><p><strong>Brightens Dull Complexions:</strong> Regular application sloughs off dead surface cell buildup, encouraging healthy cell renewal and restoring authentic, natural skin radiance.</p>',
      description: '<p>Claytrix Face Pack is a detoxifying clay treatment combining natural clarifying clay with Kojic Acid and Hyaluronic Acid to tighten pores, erase dark spots, and illuminate skin.</p>',
      howToUse: '<p>Apply an even layer over cleansed face and neck avoiding eye and lip areas. Leave for 10-15 minutes until dry. Rinse with lukewarm water. Use 1-2 times weekly.</p>',
      precataions: '<p>For external use only. Store in a cool, dry place away from direct sunlight.</p>',
      currentStock: 50,
      productView: 0
    },
    {
      title: 'Minohike 10 Topical Hair Regrowth Solution',
      slug: 'minohike-10-topical-hair-regrowth-solution',
      type: 'Get The Glow',
      category: ['Anti-Aging'],
      mrp: 999,
      sellingPrice: 850,
      images: [uploadedUrls['image14.jpeg']],
      skinSuitability: '<ul><li>Hereditary hair loss (Androgenetic alopecia)</li><li>Crown & vertex thinning</li><li>Receding hairline</li><li>Progressive hair thinning</li></ul>',
      ingredients: [
        'Minoxidil 10% w/v',
        'Scalp Penetration & Vasodilation Base'
      ],
      keyBenefits: '<p><strong>Reactivates Shrunken Hair Follicles:</strong> Revitalizes dormant or shrunk hair follicles, shifting them from their resting phase back into an active growing state.</p><p><strong>Improves Blood Flow & Nutrient Delivery:</strong> As a vasodilator, it widens blood vessels in the scalp, increasing the circulation of oxygen, blood, and vital nutrients directly to hair roots.</p><p><strong>Increases Hair Density & Thickness:</strong> Regular application extends the active growth phase of the hair cycle, allowing existing hair strands to grow significantly thicker and denser.</p><p><strong>Slows Down Hair Shedding:</strong> Actively minimizes progressive hair thinning and keeps hair strands anchored to the scalp for a longer period.</p><p><strong>Targets Advanced Pattern Baldness:</strong> Higher 10% concentration is utilized for advanced stages of hereditary hair loss and crown thinning.</p>',
      description: '<p>Minohike 10 is an intensive 10% Minoxidil topical solution designed for advanced hair thinning and androgenetic alopecia to stimulate follicle reactivation and dense regrowth.</p>',
      howToUse: '<p>Apply 1 ml directly with dropper to affected scalp areas twice daily. Massage gently with fingertips. Do not wash hair for at least 4 hours after application.</p>',
      precataions: '<p>FOR EXTERNAL USE ON SCALP ONLY. Do not apply on inflamed, irritated, or broken skin. Wash hands immediately after use. Keep out of reach of children.</p>',
      currentStock: 50,
      productView: 0
    }
  ];

  console.log(`Saving ${productsData.length} products into MongoDB...`);

  let addedCount = 0;
  let updatedCount = 0;

  for (const item of productsData) {
    const existing = await Product.findOne({ slug: item.slug });
    if (existing) {
      await Product.findByIdAndUpdate(existing._id, item, { new: true });
      console.log(`Updated product: ${item.title}`);
      updatedCount++;
    } else {
      await Product.create(item);
      console.log(`Created new product: ${item.title}`);
      addedCount++;
    }
  }

  console.log(`\n🎉 DONE! Added: ${addedCount}, Updated: ${updatedCount}, Total in DB: ${await Product.countDocuments()}`);
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
