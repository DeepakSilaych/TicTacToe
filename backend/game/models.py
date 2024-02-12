from django.db import models

class Game(models.Model):
    gameid = models.IntegerField(primary_key=True, default=0)
    board = models.CharField(max_length=9, default="---------")   
    player1 = models.CharField(max_length=255, default="")  
    player2 = models.CharField(max_length=255, default="")
    turn = models.IntegerField(default=0)  
    winner = models.CharField(max_length=1, blank=True, null=True)
    is_active = models.IntegerField(default=0)
