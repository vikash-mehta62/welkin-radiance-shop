import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/contexts/AdminContext";
import { Plus, Edit, Trash2, Eye, Package } from "lucide-react";
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
} from "@/services2/operations/product";
const ProductManagement = () => {
  const { products, deleteProduct } = useAdmin();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchProduct = async () => {
    await getAllProductAPI();
  };
  const handleDelete = (id: string) => {
    deleteProductAPI(id);
    fetchProduct();
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
              <div className="flex items-center justify-between mb-4">
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
                <Badge variant="outline">{product.type}</Badge>
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
