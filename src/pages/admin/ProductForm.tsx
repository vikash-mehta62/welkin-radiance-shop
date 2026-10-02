import { useState, useEffect, useMemo } from "react";
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
import { ArrowLeft, Plus, Trash2, UploadCloud, X, Check } from "lucide-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { imageUpload } from "@/services2/operations/image";
import {
  createProductAPI,
  updateProductAPI
} from "@/services2/operations/product"

export const defaultCategories = [
  'Anti-Aging',
  'Acne Care',
  'Dry Skin',
  'Oily Skin',
  'Sensitive Skin',
  'Glow Boost',
  'Hydrating',
  'Hyperpigmentation',
  'Brightness Skin',
  'Anti Wrinkle',
  'Natural Antioxidant',
  'Hair Care',
  'Joint Care',
  'Sun Protection',
  'Scar Care'
];

// Backwards compatibility for external imports
export const categories = defaultCategories;

export const defaultProductTypes = [
  'Serum',
  'Cleanser',
  'Exfoliation',
  'Moisturizer',
  'Toner',
  'Sunscreen',
  'Face Mask',
  'Eye Cream',
  'Cream',
  'Night Cream',
  'Oral Sun Protection',
  'Get The Glow',
  'Topical Solution',
  'Soap',
  'Gel',
  'Supplement'
];

const ProductForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { products, addProduct, updateProduct } = useAdmin();
  const { toast } = useToast();
  const isEdit = Boolean(id);

  // Custom categories & types persisted in localStorage
  const [customCategories, setCustomCategories] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('admin_custom_categories');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [customProductTypes, setCustomProductTypes] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('admin_custom_product_types');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state for adding new type / category
  const [showAddType, setShowAddType] = useState(false);
  const [newTypeName, setNewTypeName] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [formData, setFormData] = useState<Omit<ProductFormData, 'id'>>({
    title: '',
    slug: '',
    type: '',
    sequence: 0,
    category: [],
    mrp: 0,
    sellingPrice: 0,
    images: ['', ''],
    keyBenefits: '',
    description: '',
    skinSuitability: '',
    precataions:'',
    ingredients: [],
    howToUse: '',
    extraInfoBlocks: [],
    faqs: []
  });

  // Merge default, existing products' types, custom added, and current form value
  const allProductTypes = useMemo(() => {
    const fromProducts = products.map(p => p.type).filter(Boolean);
    const current = formData.type ? [formData.type] : [];
    const combined = Array.from(new Set([...defaultProductTypes, ...fromProducts, ...customProductTypes, ...current]));
    return combined.sort((a, b) => a.localeCompare(b));
  }, [products, customProductTypes, formData.type]);

  // Merge default, existing products' categories, custom added, and current form value
  const allCategories = useMemo(() => {
    const fromProducts = products.flatMap(p => p.category || []).filter(Boolean);
    const combined = Array.from(new Set([...defaultCategories, ...fromProducts, ...customCategories, ...formData.category]));
    return combined.sort((a, b) => a.localeCompare(b));
  }, [products, customCategories, formData.category]);

  const handleAddNewType = () => {
    const trimmed = newTypeName.trim();
    if (!trimmed) return;
    if (!allProductTypes.includes(trimmed)) {
      const updated = [...customProductTypes, trimmed];
      setCustomProductTypes(updated);
      try {
        localStorage.setItem('admin_custom_product_types', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    setFormData(prev => ({ ...prev, type: trimmed }));
    setNewTypeName('');
    setShowAddType(false);
    toast({
      title: "Product Type Added",
      description: `"${trimmed}" has been added and selected.`,
    });
  };

  const handleAddNewCategory = () => {
    const trimmed = newCategoryName.trim();
    if (!trimmed) return;
    if (!allCategories.includes(trimmed)) {
      const updated = [...customCategories, trimmed];
      setCustomCategories(updated);
      try {
        localStorage.setItem('admin_custom_categories', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
    }
    if (!formData.category.includes(trimmed)) {
      setFormData(prev => ({ ...prev, category: [...prev.category, trimmed] }));
    }
    setNewCategoryName('');
    setShowAddCategory(false);
    toast({
      title: "Category Added",
      description: `"${trimmed}" category has been added and selected.`,
    });
  };

  const handleRemoveCustomCategory = (catToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = customCategories.filter(c => c !== catToRemove);
    setCustomCategories(updated);
    try {
      localStorage.setItem('admin_custom_categories', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setFormData(prev => ({
      ...prev,
      category: prev.category.filter(c => c !== catToRemove)
    }));
    toast({
      title: "Category Removed",
      description: `"${catToRemove}" removed from custom categories.`,
    });
  };

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
        setFormData({
          ...productData,
          sequence: typeof product.sequence === 'number' ? product.sequence : 0
        });
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="type">Product Type*</Label>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-6 text-xs px-2 text-primary hover:bg-primary/10 flex items-center gap-1"
                    onClick={() => setShowAddType(prev => !prev)}
                  >
                    <Plus className="h-3 w-3" />
                    {showAddType ? 'Close' : 'Add New'}
                  </Button>
                </div>

                {showAddType && (
                  <div className="flex items-center gap-1.5 mb-2 p-2 bg-muted/60 rounded-md border">
                    <Input
                      placeholder="e.g. Cleansing Foam"
                      value={newTypeName}
                      onChange={(e) => setNewTypeName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddNewType();
                        }
                      }}
                      className="h-8 text-xs flex-1"
                      autoFocus
                    />
                    <Button
                      type="button"
                      size="sm"
                      className="h-8 px-2.5 text-xs bg-primary text-primary-foreground"
                      onClick={handleAddNewType}
                    >
                      Add
                    </Button>
                  </div>
                )}

                <Select
                  value={formData.type}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select product type" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {allProductTypes.map(type => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="sequence">Sequence / Order</Label>
                <Input
                  id="sequence"
                  type="number"
                  value={formData.sequence ?? 0}
                  onChange={(e) => setFormData(prev => ({ ...prev, sequence: Number(e.target.value) }))}
                  placeholder="0 (e.g. 1, 2 or -1, -2)"
                />
                <p className="text-[11px] text-muted-foreground mt-1">
                  1, 2 = Pehle | 0 = Normal | -1 = Last, -2 = 2nd Last
                </p>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">Categories</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 text-xs px-2 text-primary hover:bg-primary/10 flex items-center gap-1"
                  onClick={() => setShowAddCategory(prev => !prev)}
                >
                  <Plus className="h-3 w-3" />
                  {showAddCategory ? 'Close' : 'Add New Category'}
                </Button>
              </div>

              {showAddCategory && (
                <div className="flex items-center gap-1.5 p-2 bg-muted/60 rounded-md border">
                  <Input
                    placeholder="e.g. Skin Barrier, Sun Protection"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddNewCategory();
                      }
                    }}
                    className="h-8 text-xs flex-1"
                    autoFocus
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="h-8 px-2.5 text-xs bg-primary text-primary-foreground"
                    onClick={handleAddNewCategory}
                  >
                    Add
                  </Button>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-1">
                {allCategories.map(category => {
                  const isChecked = formData.category.includes(category);
                  const isCustom = customCategories.includes(category);
                  return (
                    <div
                      key={category}
                      className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md border text-xs transition-colors ${
                        isChecked
                          ? 'bg-primary/15 border-primary/40 text-primary-foreground font-medium'
                          : 'bg-background border-border hover:bg-muted text-foreground'
                      }`}
                    >
                      <Checkbox
                        id={`cat-${category}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                        className="h-3.5 w-3.5"
                      />
                      <label
                        htmlFor={`cat-${category}`}
                        className="cursor-pointer select-none"
                      >
                        {category}
                      </label>
                      {isCustom && (
                        <button
                          type="button"
                          title="Remove category"
                          onClick={(e) => handleRemoveCustomCategory(category, e)}
                          className="text-muted-foreground hover:text-destructive p-0.5 rounded ml-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {formData.category.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2">
                  <span className="text-xs text-muted-foreground font-medium mr-1">Selected:</span>
                  {formData.category.map(cat => (
                    <Badge
                      key={cat}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs py-0.5 pl-2 pr-1 bg-primary/10 text-primary border border-primary/30"
                    >
                      {cat}
                      <button
                        type="button"
                        onClick={() => handleCategoryChange(cat, false)}
                        className="hover:bg-primary/20 rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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
            <div>
              <Label htmlFor="precataions" className="mb-2 block">Precautions</Label>
              <div style={{ minHeight: '150px' }}>
                <ReactQuill
                  theme="snow"
                  value={formData.precataions}
                  onChange={(value) => setFormData(prev => ({ ...prev, precataions: value }))}
                  modules={quillModules}
                  formats={quillFormats}
                  placeholder="Enter Precataions"
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
                {formData.ingredients.length > 0 && (
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