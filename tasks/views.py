from django.shortcuts import render, HttpResponse, redirect, get_object_or_404
from .form import TaskForm
from .models import Task
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def index(request):
    tasks = Task.objects.filter(status=False)
    return render(request, "index.html", {"form": TaskForm, "tasks": tasks})


def create(request):
    if request.method == "POST":
        form = TaskForm(request.POST)
        if form.is_valid():
            task = form.save()
            return JsonResponse({"id":task.id, "title":task.title})

    return JsonResponse({'error:':'invalid'})


def complete_list(request):
    task_complete = Task.objects.filter(status=True)
    return render(request, "index.html", {"tasks": task_complete})


def update(request, id):
    task = Task.objects.get(id=id)
    if request.method == "POST":
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            task = form.save()
            return redirect('/')

    else:
        form = TaskForm(instance=task)
    return render(request, "update.html", {"form": form})


def delete(request, id):
    task = get_object_or_404(Task, id=id)
    task.delete()
    return JsonResponse({"status": "deleted","id":id})

def complete(request, id):
    if request.method == 'POST':
        task = Task.objects.get(id=id)
        task.status = True
        task.save()
        return JsonResponse({"status": "update","id":id})
