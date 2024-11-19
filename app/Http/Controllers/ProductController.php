<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    //

    public function index(){
        $products = Product::select('*')->latest('id')->get();
        if($products->isEmpty()){
            return response()->json(['message'=> 'No Products Found'],404);
        }
        return response()->json(['products'=> $products],200);
    }
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(),['name' => 'required']);
        if ($validator->fails()) {
            return response()->json(['status' => 422,'errors'=> $validator->errors()],status: 422);
        }
        $request->validate([
            "name"=> "required",
        ]);
        $image_path = null;
        if ($request->hasFile("image")) {
            $image = $request->file("image");
            $path = 'uploads';
            $image_name = $image->getClientOriginalName();
            $image->move($path,$image_name);
            $image_path = $path.'/'.$image_name;
        }
        $product = Product::create([
            "name" => $request->name,
            "description" => $request->description,
            "image" => $image_path,
            "type" => $request->type,
            "quantity" => $request->quantity,
            "price" => $request->price,
        ]);

        return response()->json(['message' => 'product added successfully'],201);
    }

    public function edit($id){
        $product = Product::find($id);
        return response()->json(['product'=> $product],200);
    }

    public function update(Request $request,$id){
        $product = Product::find($id);
        $image_path = $product->image;
        $product = $product->update([
            "name" => $request->name,
            "description" => $request->description,
            "image" => $image_path,
            "type" => $request->type,
            "quantity" => $request->quantity,
            "price" => $request->price,
        ]);
        return response()->json(['message'=> 'product updated successfully'],200);
    }
    public function destroy($id){
        $product = Product::find($id);
        $product->delete();
    }
}
