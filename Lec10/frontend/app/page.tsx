'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Product } from "@/types/Product";
import axiosInstance from "@/utils/axions-instance";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";


export default function Home() {

  const [products, setProducts] = useState<Product[]>([])
  const [id, setId] = useState<string | null>(null)
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    price: 2000,
    brand: '',
    desc: '',
    isAvailable: true
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target
    if (name === "isAvailable") {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const getAllProducts = async () => {
    const result = await axiosInstance.get('/products')
    setProducts(result.data)
  }

  const handleDelete = async (id: string) => {
    const resp = await axiosInstance.delete(`/products/${id}`)
    if (resp.status === 200) {
      toast.success('Product Deleted successfully')
      getAllProducts()
    }
  }

  const handleUpdate = async (id: string) => {
    setId(id)
    const resp = await axiosInstance.get(`/products/${id}`)
    const data = resp.data as Product
    if (resp.status === 200) {
      setFormData({
        name: data.name,
        price: data.price,
        brand: data.brand,
        desc: data.desc,
        isAvailable: data.isAvailable
      })
    }
    setShow(true)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (id) {
      const resp = await axiosInstance.put(`/products/${id}`, formData)
      if (resp.status === 200) {
        getAllProducts()
        setShow(false)
        setId(null)
      }
    } else {
      const resp = await axiosInstance.post('/products', formData)
      if (resp.status === 201) {
        getAllProducts()
        setShow(false)
      }
    }
    setFormData({
      name: "",
      price: 0,
      brand: "",
      desc: "",
      isAvailable: true
    })
  }

  useEffect(() => {
    getAllProducts()
  }, [])

  return (
    <>
      <div className="w-10/12 mx-auto p-4">
        <Dialog open={show} onOpenChange={setShow}>
          <div className="flex justify-between">
            <h1 className="text-xl">Products</h1>
            <DialogTrigger asChild>
              <Button>Add new</Button>
            </DialogTrigger>
          </div>

          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>

              <DialogHeader>
                <DialogTitle>Add new Product</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Product Name</Label>
                  <Input
                    onChange={handleChange}
                    id="name-1"
                    name="name"
                    placeholder="Iphone 15"
                    value={formData.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-2">Product Price</Label>
                  <Input onChange={handleChange} value={formData.price} id="name-2" name="price" placeholder="2000" type="number" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-3">Product Brand</Label>
                  <Input onChange={handleChange} value={formData.brand} id="name-3" name="brand" placeholder="Apple" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-4">Product Desc</Label>
                  <Input onChange={handleChange} value={formData.desc} id="name-4" name="desc" placeholder="Random" />
                </div>
                <div className="flex gap-2">
                  <Input className="w-4" id="username-1" onChange={handleChange} type="checkbox" name="isAvailable" defaultChecked={formData.isAvailable} />
                  <Label htmlFor="username-1">Is Available</Label>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>

          <Table className="mt-4">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Products</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product: Product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.desc}</TableCell>
                  <TableCell>{product.brand}</TableCell>
                  <TableCell>{product.isAvailable ? 'Yes' : 'No'}</TableCell>
                  <TableCell className="text-right">{product.price}</TableCell>
                  <TableCell className="text-right"><Button onClick={() => handleDelete(product._id)} variant={'destructive'}>Delete</Button></TableCell>
                  <TableCell className="text-right"><Button onClick={() => handleUpdate(product._id)} variant={'secondary'}>update</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">${products.reduce((tot, cur) => tot + cur.price, 0)}</TableCell>
                <TableCell >Total</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Dialog >
      </div>
    </>
  );
}
