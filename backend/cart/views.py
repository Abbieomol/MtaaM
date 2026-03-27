from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from .models import Cart, CartItem, WishlistItem
from products.models import Product


@login_required
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart, created = Cart.objects.get_or_create(user=request.user)

    item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        item.quantity += 1
    item.save()

    return JsonResponse({
        "status": "success",
        "product": product.name,
        "quantity": item.quantity
    })


@login_required
def remove_from_cart(request, product_id):
    cart = get_object_or_404(Cart, user=request.user)
    item = get_object_or_404(CartItem, cart=cart, product_id=product_id)
    item.delete()
    return JsonResponse({"status": "removed", "product_id": product_id})


@login_required
def add_to_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    item, created = WishlistItem.objects.get_or_create(user=request.user, product=product)
    return JsonResponse({"status": "added", "product": product.name})


@login_required
def remove_from_wishlist(request, product_id):
    item = get_object_or_404(WishlistItem, user=request.user, product_id=product_id)
    item.delete()
    return JsonResponse({"status": "removed", "product_id": product_id})