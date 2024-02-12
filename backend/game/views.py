from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.http import HttpResponseForbidden, HttpResponseBadRequest
from rest_framework.parsers import JSONParser
from .models import Game
from random import randint
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def create_game(request):
    print("working++++++++++++++++++")
    print(request)
    if request.method == 'POST':
        print("working++++++++++++++++++")
        data = JSONParser().parse(request)
        player1 = data['username']

        gameid = randint(10, 99)
        while Game.objects.filter(gameid=gameid).exists():
            gameid = randint(10, 99)
    
        game = Game.objects.create(gameid=gameid,player1=player1)
        game.save()

        return JsonResponse({'game_id': gameid}, status=201)
    return JsonResponse({'error': 'Invalid request'}, status=400)

@csrf_exempt
def join_game(request, game_id):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        player2 = data['username']

        game = Game.objects.get(gameid=game_id)

        if game:
            if game.player2:
                return JsonResponse({'error': 'Game is full'}, status=400)
            else:
                game.player2 = player2
                game.is_active = 1
                game.save()
                return JsonResponse({'game_id': game_id}, status=200)
        else:
            return JsonResponse({'error': 'Game not found'}, status=404)

    return HttpResponseForbidden()

@csrf_exempt
def check_waiting(request, game_id):
    if request.method == 'GET':
        game = Game.objects.get(gameid=game_id)
        if game:
            if game.player1 and game.player2:
                game.is_active = 2
                game.turn = randint(1,2)
                game.save()
                return JsonResponse({'game_id': game_id,' turn': game.turn, 'is_active': game.is_active}, status=200)
            else:
                return JsonResponse({'error': 'Game not found'}, status=404)
            
    return HttpResponseForbidden()

@csrf_exempt
def game_status(request, game_id):
    if request.method == 'GET':
        game = Game.objects.get(gameid=game_id)
        if game:
            if game.is_active == 2:
                gameboard = game.board
                return JsonResponse({'game_id': game_id, 'board': gameboard, 'turn': game.turn, 'is_active': game.is_active}, status=200)
            else:
                return JsonResponse({'error': 'Game not found'}, status=404)
        else:
            return JsonResponse({'error': 'Game not found'}, status=404)
    return HttpResponseForbidden()

@csrf_exempt
def move(request, game_id):
    print("working1++++++++++++++++++")
    if request.method == 'POST':
        game = Game.objects.get(gameid=game_id)

        if game:
            data = JSONParser().parse(request)
            player = data['player']
            tic_id = data['tic_id']
            board = game.board
            if board[tic_id] == '-':
                print('-----------------ok ok---------------')
                print(game.board)
                game.board = board[:tic_id] + str(player) + board[tic_id+1:]
                print(game.board)
                if checkGameStatus(board):
                    game.is_active = 3
                    if checkGameStatus(board) == 2:
                        game.winner =  'draw'
                    else:
                        game.winner = player 

                game.turn = 1 if game.turn == 2 else 2
                game.save()
                return JsonResponse({'game_id': game_id, 'board': game.board, 'turn': game.turn, 'is_active': game.is_active, 'result': game.winner}, status=200)
            else:
                return JsonResponse({'error': 'Invalid move'}, status=400)

    return HttpResponseForbidden()


def checkGameStatus(board):
    winning_combinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    for combo in winning_combinations:
        if board[combo[0]] == board[combo[1]] == board[combo[2]] and board[combo[0]] != '-':
            return 1
    
    if '-' not in board:
        return 2
    return False