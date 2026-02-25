from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import get_object_or_404


from .models import MediaRequest,Asset
from .serializers import MediaRequestSerializer

class MediaRequestListView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,request):
        if request.user.role == 'customer':
            requests = MediaRequest.objects.filter(customer=request.user)
        else:
            requests = MediaRequest.objects.all()
        serializer = MediaRequestSerializer(requests, many=True)
        return Response(serializer.data)

    def post(self, request):
        if request.user.role =='customer':
            serializer = MediaRequestSerializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                media_request = serializer.save(customer=request.user)
                files = request.FILES.getlist('files')  
                for f in files:
                    Asset.objects.create(request=media_request, file=f)
                return Response(MediaRequestSerializer(media_request).data, status=status.HTTP_201_CREATED)
        return Response({'error':'you are not customer'}, status=status.HTTP_403_FORBIDDEN)



class MediaRequestDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        media_request = get_object_or_404(MediaRequest, pk=pk)
        if request.user.role != "team":
            return Response({"error": "You are not team member"}, status=status.HTTP_403_FORBIDDEN)

        data = {}
        new_status = request.data.get('status')
        new_finished_file = request.FILES.get("finished_file")
        if new_status is not None:
            data["status"] = new_status
        if new_finished_file is not None:
            data["finished_file"] = new_finished_file

        if data:
            serializer = MediaRequestSerializer(media_request, data=data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(serializer.data)
        return Response({'error':'empty fields not allowed'}, status=status.HTTP_400_BAD_REQUEST)




