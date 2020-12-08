<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;

class OrderController extends Controller
{
  public function __construct()
  {
    $this->middleware('JWT', ['except' => ['index', 'store']]);
  }

  public function index()
  {
    $total = [];
    $orders = User::find(1)->orders()->get(); // Order::all();
    $products = Product::all();

    foreach ($orders as $order) {
      $list = [];
      array_push($list, [
        'id' => $order->id, // 주문 테이블 id
        'user_id' => $order->user_id, // 관리자 id

        'name' => $order->name, // 구매자 이름
        'email' => $order->email, // 구매자 이메일
        'address' => $order->address, // 구매자 주소

        'product_id' => $order->products()->first()->pivot->product_id, // 제품 아이디
        'product_name' => $products->get($order->products()->first()->pivot->product_id)->name, // 제품 이름
        'product_price' => $products->get($order->products()->first()->pivot->product_id)->price, // 제품 가격

        'quantity' => $order->products()->first()->pivot->quantity, // 주문 제품 수량
        'created_at' => $order->products()->first()->pivot->created_at, // 주문 제품 날짜

        'billable_amount' => ($products->get($order->products()->first()->pivot->product_id)->price * $order->products()->first()->pivot->quantity), // 구매자 총 금액
        'message' => $order->message, // 구매자 메세지
        'deposit_status' => $order->deposit_status, // 입금 상태
        'shipping_status' => $order->shipping_status // 배송 상태
      ]);
      $total = array_merge($list, $total);
    }
    // dd(json_encode($total));

    return response()->json($total);
  }

  public function create()
  {
    //
  }

  public function store(Request $request)
  {
    //
  }

  public function show($id)
  {
    //
  }

  public function edit($id)
  {
    //
  }

  public function update(Request $request, $id)
  {
    //
  }

  public function destroy($id)
  {
    //
  }
}
