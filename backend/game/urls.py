from django.urls import path
from . import views

urlpatterns = [
    path('create_game/', views.create_game),
    path('join_game/<int:game_id>/', views.join_game),
    path('waiting/<int:game_id>/', views.check_waiting),
    path('game_status/<int:game_id>/', views.game_status),
    path('move/<int:game_id>/', views.move),
]
