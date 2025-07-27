import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useAdmin, ProductFormData } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Plus, Trash2, UploadCloud, X } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imageUpload } from "@/services2/operations/image";
import {
  createProductAPI,
  updateProductAPI
} from "@/services2/operations/product"

export const categories = ['Anti-Aging', 'Acne Care', 'Dry Skin', 'Oily Skin', 'Sensitive Skin', 'Glow Boost', 'Hydrating', "Hyperpigmentation" ,"Brightness Skin" , "Anti Wrinkle", "Natural Antioxidant"];

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useAdmin();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<Omit<ProductFormData, 'id'>>({
    title: '',
    slug: '',
    type: '',
    category: [],
    mrp: 0,
    sellingPrice: 0,
    images: ['', ''],
    keyBenefits: '',
    description: '',
    skinSuitability: '',
    ingredients: [''],
    howToUse: '',
    extraInfoBlocks: [],
    faqs: []
  });

  const productTypes = ['Serum', 'Cleanser', 'Moisturizer', 'Toner', 'Sunscreen', 'Face Mask', 'Eye Cream',"Cream" ,"Night Cream","Oral Sun Protection", "Get The Glow"];

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align', 'link'
  ];

  useEffect(() => {
    if (isEdit && id) {
      const product = products.find(p => p.id === id);
      if (product) {
        const { id: productId, ...productData } = product;
        setFormData(productData);
      }
    }
  }, [isEdit, id, products]);

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      category: checked
        ? [...prev.category, category]
        : prev.category.filter(c => c !== category)
    }));
  };

  const addImage = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImage = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, '']
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ing, i) => i === index ? value : ing)
    }));
  };

  const addExtraInfoBlock = () => {
    setFormData(prev => ({
      ...prev,
      extraInfoBlocks: [...prev.extraInfoBlocks, {
        id: Date.now().toString(),
        image: '',
        title: '',
        content: ''
      }]
    }));
  };

  const removeExtraInfoBlock = (index: number) => {
    setFormData(prev => ({
      ...prev,
      extraInfoBlocks: prev.extraInfoBlocks.filter((_, i) => i !== index)
    }));
  };

  const updateExtraInfoBlock = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      extraInfoBlocks: prev.extraInfoBlocks.map((block, i) =>
        i === index ? { ...block, [field]: value } : block
      )
    }));
  };

  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, {
        id: Date.now().toString(),
        question: '',
        answer: ''
      }]
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };






  const handleImageFileChange = async (index, file) => {
    const uploaded = await imageUpload([file]);
    if (uploaded.length > 0) {
      updateImage(index, uploaded[0]); // Cloudinary URL
    }
  };

  const handleRemoveImage = (index) => {
    updateImage(index, ""); // Clear URL
  };



  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
console.log(formData)


    if (isEdit && id) {
      await updateProductAPI(id, formData);
      toast({
        title: "Product Updated!",
        description: "Product has been updated successfully.",
      });
    } else {
      await createProductAPI(formData)
      toast({
        title: "Product Created!",
        description: "New product has been created successfully.",
      });
    }

    // navigate('/admin/products');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold text-foreground">
          {isEdit ? 'Edit Product' : 'Create New Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Product Title*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g., Vitamin C Brightening Serum"
                  required
                />
              </div>
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                  placeholder="vitamin-c-brightening-serum"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="type">Product Type*</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {productTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="mrp">MRP (₹)*</Label>
                <Input
                  id="mrp"
                  type="number"
                  value={formData.mrp}
                  onChange={(e) => setFormData(prev => ({ ...prev, mrp: Number(e.target.value) }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="sellingPrice">Selling Price (₹)*</Label>
                <Input
                  id="sellingPrice"
                  type="number"
                  value={formData.sellingPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, sellingPrice: Number(e.target.value) }))}
                  required
                />
              </div>
            </div>

            <div>
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={category}
                      checked={formData.category.includes(category)}
                      onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                    />
                    <Label htmlFor={category} className="text-sm">{category}</Label>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {formData.category.map(cat => (
                  <Badge key={cat} variant="secondary">{cat}</Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Images */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.images.map((image, index) => (
              <div key={index} className="flex items-center gap-2">
                {image ? (
                  <div className="relative w-24 h-24 rounded overflow-hidden border">
                    <img src={image} alt={`Product Image ${index + 1}`} className="object-cover w-full h-full" />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer w-24 h-24 flex items-center justify-center border rounded">
                    <UploadCloud className="h-6 w-6 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleImageFileChange(index, e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                )}
                {formData.images.length > 2 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeImage(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addImage}>
              <Plus className="h-4 w-4 mr-2" />
              Add Image
            </Button>


          </CardContent>
        </Card>

        {/* Product Details with Rich Text Editors */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="keyBenefits" className="mb-2 block">Product Description</Label>
              <div style={{ minHeight: '150px' }}>
                <ReactQuill
                  theme="snow"
                  value={formData.keyBenefits}
                  onChange={(value) => setFormData(prev => ({ ...prev, keyBenefits: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter key benefits of the product..."
                  style={{ height: '120px', marginBottom: '40px' }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="mb-2 block">Key Benefits</Label>
              <div style={{ minHeight: '150px' }}>
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter detailed product description..."
                  style={{ height: '120px', marginBottom: '40px' }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="skinSuitability" className="mb-2 block">Recommended for</Label>
              <div style={{ minHeight: '120px' }}>
                <ReactQuill
                  theme="snow"
                  value={formData.skinSuitability}
                  onChange={(value) => setFormData(prev => ({ ...prev, skinSuitability: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter skin suitability information..."
                  style={{ height: '90px', marginBottom: '40px' }}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="howToUse" className="mb-2 block">How to Use</Label>
              <div style={{ minHeight: '150px' }}>
                <ReactQuill
                  theme="snow"
                  value={formData.howToUse}
                  onChange={(value) => setFormData(prev => ({ ...prev, howToUse: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter step-by-step usage instructions..."
                  style={{ height: '120px', marginBottom: '40px' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="Ingredient name"
                  className="flex-1"
                />
                {formData.ingredients.length > 1 && (
                  <Button type="button" variant="outline" size="sm" onClick={() => removeIngredient(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addIngredient}>
              <Plus className="h-4 w-4 mr-2" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        {/* Extra Info Blocks with Rich Text Editor */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Additional Information Blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.extraInfoBlocks.map((block, index) => (
              <div key={block.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Info Block {index + 1}</h4>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeExtraInfoBlock(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex gap-2 items-center">
                    {block.image ? (
                      <div className="relative w-24 h-24 border rounded overflow-hidden">
                        <img src={block.image} alt="Info Block" className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={() => updateExtraInfoBlock(index, "image", "")}
                          className="absolute top-1 right-1 bg-white/80 rounded-full p-1 shadow"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                    ) : (
                      <label className="cursor-pointer w-24 h-24 flex items-center justify-center border rounded">
                        <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const uploaded = await imageUpload([e.target.files[0]]);
                              if (uploaded.length > 0) {
                                updateExtraInfoBlock(index, "image", uploaded[0]);
                              }
                            }
                          }}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  <Input
                    value={block.title}
                    onChange={(e) => updateExtraInfoBlock(index, 'title', e.target.value)}
                    placeholder="Block title"
                  />
                </div>
                <div>
                  <Label className="mb-2 block">Content</Label>
                  <div style={{ minHeight: '150px' }}>
                    <ReactQuill
                      theme="snow"
                      value={block.content}
                      onChange={(value) => updateExtraInfoBlock(index, 'content', value)}
                      modules={quillModules}
                      formats={quillFormats}
                      placeholder="Enter block content..."
                      style={{ height: '120px', marginBottom: '40px' }}
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addExtraInfoBlock}>
              <Plus className="h-4 w-4 mr-2" />
              Add Info Block
            </Button>
          </CardContent>
        </Card>

        {/* FAQs */}
        <Card className="border-sage-light/50">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {formData.faqs.map((faq, index) => (
              <div key={faq.id} className="border rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">FAQ {index + 1}</h4>
                  <Button type="button" variant="outline" size="sm" onClick={() => removeFAQ(index)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <Input
                  value={faq.question}
                  onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                  placeholder="Question"
                />
                <Textarea
                  value={faq.answer}
                  onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                  placeholder="Answer..."
                  rows={3}
                />
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFAQ}>
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">
            {isEdit ? 'Update Product' : 'Create Product'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
