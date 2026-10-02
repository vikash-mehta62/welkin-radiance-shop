import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useAdmin } from "@/contexts/AdminContext";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, Package, ArrowUpDown, Check, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  deleteProductAPI,
  getAllProductAPI,
  updateProductAPI,
} from "@/services2/operations/product";

const ProductManagement = () => {
  const { products, deleteProduct, updateProduct, refreshProducts } = useAdmin();
  const { toast } = useToast();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [seqInputs, setSeqInputs] = useState<{ [id: string]: number }>({});
  const [savingSeqId, setSavingSeqId] = useState<string | null>(null);

  const fetchProduct = async () => {
    if (refreshProducts) {
      await refreshProducts();
    } else {
      await getAllProductAPI();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteProductAPI(id);
    deleteProduct(id);
    await fetchProduct();
  };

  const handleSaveSequence = async (id: string, currentSeq: number) => {
    const val = seqInputs[id] !== undefined ? seqInputs[id] : currentSeq;
    setSavingSeqId(id);
    try {
      await updateProductAPI(id, { sequence: val });
      updateProduct(id, { sequence: val });
      if (refreshProducts) {
        await refreshProducts();
      }
      toast({
        title: "Sequence Updated!",
        description: `Product sequence set to ${val}. List re-ordered automatically.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update sequence.",
        variant: "destructive",
      });
    } finally {
      setSavingSeqId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Product Management
          </h1>
          <p className="text-muted-foreground">Manage your skincare products</p>
        </div>
        <Link to="/admin/products/create">
          <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Sequence Guide Banner */}
      <div className="flex items-start sm:items-center justify-between p-3.5 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-primary shrink-0" />
          <span>
            <strong>Sequence Quick Edit:</strong> Card ke andar sequence number daal kar <strong>Save</strong> karein. List turant nayi sequence ke according set ho jayegi!
            <span className="block sm:inline sm:ml-2 text-muted-foreground font-normal">
              (1, 2, 3... = Sabse Pehle | 0 = Normal / Middle | -2 = Last se Dusra | -1 = Sabse Last)
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="border-sage-light/50 hover:shadow-elegant transition-all"
          >
            <CardHeader className="pb-3">
              <div className="aspect-square w-full bg-sage-light/20 rounded-lg mb-3 overflow-hidden">
                <img
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-lg text-foreground line-clamp-2">
                {product.title}
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {product.category.map((cat) => (
                  <Badge key={cat} variant="secondary" className="text-xs">
                    {cat}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <span className="text-lg font-bold text-primary">
                    ₹{product.sellingPrice}
                  </span>
                  {product.mrp > product.sellingPrice && (
                    <span className="text-sm text-muted-foreground line-through ml-2">
                      ₹{product.mrp}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border border-primary/20">
                    Seq: {product.sequence ?? 0}
                  </Badge>
                  <Badge variant="outline">{product.type}</Badge>
                </div>
              </div>

              {/* 👇 Sequence Inline Edit Box */}
              <div className="flex items-center justify-between p-2 mb-3 bg-muted/40 rounded-lg border border-border/60">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground">Seq:</span>
                  <Input
                    type="number"
                    value={
                      seqInputs[product.id!] !== undefined
                        ? seqInputs[product.id!]
                        : (product.sequence ?? 0)
                    }
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSeqInputs((prev) => ({ ...prev, [product.id!]: val }));
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSaveSequence(product.id!, product.sequence ?? 0);
                      }
                    }}
                    className="h-7 w-20 text-xs text-center font-bold px-1"
                    placeholder="0"
                  />
                </div>
                <Button
                  size="sm"
                  className="h-7 text-xs px-2.5 bg-primary hover:bg-primary/90 text-primary-foreground gap-1"
                  disabled={savingSeqId === product.id}
                  onClick={() => handleSaveSequence(product.id!, product.sequence ?? 0)}
                >
                  {savingSeqId === product.id ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Saving
                    </>
                  ) : (
                    <>
                      <Check className="h-3 w-3" />
                      Save
                    </>
                  )}
                </Button>
              </div>

              {/* Views info */}
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <Eye className="h-4 w-4 mr-1" />
                {product.view || 0} views
              </div>


              <div className="flex items-center gap-2">
                <Link
                  to={`/admin/products/${product.id}/edit`}
                  className="flex-1"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Link to={`/products/${product.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Product</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{product.title}"? This
                        action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(product.id!)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <Card className="border-sage-light/50">
          <CardContent className="text-center py-12">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              No products yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first product.
            </p>
            <Link to="/admin/products/create">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProductManagement;
