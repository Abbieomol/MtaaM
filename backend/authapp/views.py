from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def signup(request):
    email = request.data.get("email")
    password = request.data.get("password")

    return Response({
        "message": "Signup successful",
        "email": email
    })


@api_view(['POST'])
def login(request):
    email = request.data.get("email")

    return Response({
        "message": "Login successful",
        "email": email
    })