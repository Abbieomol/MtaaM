from django.urls import path
from . import views

urlpatterns = [
    path('cart/add/', views.add_to_cart),
    path('cart/', views.view_cart),
    path('cart/update/', views.update_cart_item),
    path('cart/remove/<int:item_id>/', views.remove_from_cart),

    path('wishlist/add/', views.add_to_wishlist),
    path('wishlist/', views.view_wishlist),
    path('wishlist/remove/<int:item_id>/', views.remove_from_wishlist),
]