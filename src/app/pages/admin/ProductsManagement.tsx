import { useState } from 'react';
import { AdminHeader } from '@/app/components/admin/AdminHeader';
import { DataTable, Column } from '@/app/components/admin/DataTable';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/components/ui/dialog';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Plus, MoreVertical, Edit, Trash2, Star } from 'lucide-react';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  description: string;
  tier: number;
  price: number;
  subscriptionDiscount: number;
  imageUrl?: string;
  mostPopular: boolean;
  active: boolean;
  subscriptionEnabled: boolean;
}

export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Starter Kit',
      description: 'Perfect for those new to skincare routines',
      tier: 1,
      price: 49,
      subscriptionDiscount: 10,
      mostPopular: false,
      active: true,
      subscriptionEnabled: true,
    },
    {
      id: '2',
      name: 'Essential Kit',
      description: 'Complete daily skincare routine essentials',
      tier: 2,
      price: 79,
      subscriptionDiscount: 15,
      mostPopular: true,
      active: true,
      subscriptionEnabled: true,
    },
    {
      id: '3',
      name: 'Advanced Kit',
      description: 'Advanced formulations for visible results',
      tier: 3,
      price: 129,
      subscriptionDiscount: 15,
      mostPopular: false,
      active: true,
      subscriptionEnabled: true,
    },
    {
      id: '4',
      name: 'Premium Kit',
      description: 'Ultimate luxury skincare experience',
      tier: 4,
      price: 199,
      subscriptionDiscount: 20,
      mostPopular: false,
      active: true,
      subscriptionEnabled: true,
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    tier: '1',
    price: '',
    subscriptionDiscount: '',
    mostPopular: false,
    active: true,
  });

  const handleCreateProduct = () => {
    setFormData({
      name: '',
      description: '',
      tier: '1',
      price: '',
      subscriptionDiscount: '',
      mostPopular: false,
      active: true,
    });
    setEditingProduct(null);
    setIsCreateModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setFormData({
      name: product.name,
      description: product.description,
      tier: product.tier.toString(),
      price: product.price.toString(),
      subscriptionDiscount: product.subscriptionDiscount.toString(),
      mostPopular: product.mostPopular,
      active: product.active,
    });
    setEditingProduct(product);
    setIsCreateModalOpen(true);
  };

  const handleSaveProduct = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (editingProduct) {
        // Update existing product
        setProducts(products.map(p => 
          p.id === editingProduct.id 
            ? {
                ...p,
                name: formData.name,
                description: formData.description,
                tier: parseInt(formData.tier),
                price: parseFloat(formData.price),
                subscriptionDiscount: parseFloat(formData.subscriptionDiscount),
                mostPopular: formData.mostPopular,
                active: formData.active,
              }
            : p
        ));
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const newProduct: Product = {
          id: Date.now().toString(),
          name: formData.name,
          description: formData.description,
          tier: parseInt(formData.tier),
          price: parseFloat(formData.price),
          subscriptionDiscount: parseFloat(formData.subscriptionDiscount),
          mostPopular: formData.mostPopular,
          active: formData.active,
          subscriptionEnabled: true,
        };
        setProducts([...products, newProduct]);
        toast.success('Product created successfully');
      }
      
      setLoading(false);
      setIsCreateModalOpen(false);
    }, 1000);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast.success('Product deleted successfully');
  };

  const handleToggleSubscription = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId 
        ? { ...p, subscriptionEnabled: !p.subscriptionEnabled }
        : p
    ));
    toast.success('Subscription setting updated');
  };

  const columns: Column<Product>[] = [
    {
      key: 'image',
      header: 'Image',
      width: '80px',
      render: (product) => (
        <div className="w-12 h-12 bg-secondary rounded-lg overflow-hidden flex items-center justify-center">
          {product.imageUrl ? (
            <ImageWithFallback
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs text-muted-foreground font-medium">
              {product.name.substring(0, 2)}
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'name',
      header: 'Product Name',
      render: (product) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">{product.name}</span>
            {product.mostPopular && (
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>
        </div>
      ),
    },
    {
      key: 'tier',
      header: 'Tier',
      render: (product) => (
        <Badge variant="secondary">Tier {product.tier}</Badge>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (product) => (
        <div>
          <p className="font-medium">${product.price}</p>
          <p className="text-xs text-muted-foreground">
            {product.subscriptionDiscount}% off subscription
          </p>
        </div>
      ),
    },
    {
      key: 'subscriptionEnabled',
      header: 'Subscription',
      align: 'center',
      render: (product) => (
        <Switch
          checked={product.subscriptionEnabled}
          onCheckedChange={() => handleToggleSubscription(product.id)}
        />
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (product) => (
        <Badge variant={product.active ? 'default' : 'secondary'}>
          {product.active ? 'Active' : 'Inactive'}
        </Badge>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: (product) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEditProduct(product)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDeleteProduct(product.id)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Products" searchPlaceholder="Search products..." />

      <div className="p-6">
        <DataTable
          columns={columns}
          data={products}
          keyExtractor={(product) => product.id}
          emptyMessage="No products found. Create your first product to get started."
          actions={
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Product Catalog</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your subscription kits and products
                </p>
              </div>
              <Button onClick={handleCreateProduct}>
                <Plus className="h-4 w-4 mr-2" />
                Create Product
              </Button>
            </div>
          }
        />
      </div>

      {/* Create/Edit Product Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingProduct ? 'Edit Product' : 'Create New Product'}
            </DialogTitle>
            <DialogDescription>
              {editingProduct
                ? 'Update the product details below.'
                : 'Add a new product to your catalog.'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Essential Kit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description of the product"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tier">Tier</Label>
                <Select value={formData.tier} onValueChange={(value) => setFormData({ ...formData, tier: value })}>
                  <SelectTrigger id="tier">
                    <SelectValue placeholder="Select tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Tier 1 - Starter</SelectItem>
                    <SelectItem value="2">Tier 2 - Essential</SelectItem>
                    <SelectItem value="3">Tier 3 - Advanced</SelectItem>
                    <SelectItem value="4">Tier 4 - Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Base Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="49.00"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Subscription Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                value={formData.subscriptionDiscount}
                onChange={(e) => setFormData({ ...formData, subscriptionDiscount: e.target.value })}
                placeholder="10"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <Label htmlFor="mostPopular" className="cursor-pointer">
                  Mark as Most Popular
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display a "Most Popular" badge
                </p>
              </div>
              <Switch
                id="mostPopular"
                checked={formData.mostPopular}
                onCheckedChange={(checked) => setFormData({ ...formData, mostPopular: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
              <div>
                <Label htmlFor="active" className="cursor-pointer">
                  Active Status
                </Label>
                <p className="text-sm text-muted-foreground">
                  Make product visible to customers
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProduct} disabled={loading}>
              {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
