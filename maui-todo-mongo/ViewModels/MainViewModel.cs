using System.Collections.ObjectModel;
using System.Windows.Input;
using MauiTodoMongo.Models;
using MauiTodoMongo.Services;

namespace MauiTodoMongo.ViewModels
{
    public class MainViewModel : BaseViewModel
    {
        private readonly TodoRepository _todoRepository;
        private ObservableCollection<TodoItem> _todoItems;
        private string _newTodoTitle;

        public ObservableCollection<TodoItem> TodoItems
        {
            get => _todoItems;
            set => SetProperty(ref _todoItems, value);
        }

        public string NewTodoTitle
        {
            get => _newTodoTitle;
            set => SetProperty(ref _newTodoTitle, value);
        }

        public ICommand AddTodoCommand { get; }

        public MainViewModel()
        {
            _todoRepository = new TodoRepository();
            TodoItems = new ObservableCollection<TodoItem>();
            AddTodoCommand = new Command(AddTodo);
            LoadTodos();
        }

        private async void LoadTodos()
        {
            var todos = await _todoRepository.GetAllTodosAsync();
            foreach (var todo in todos)
            {
                TodoItems.Add(todo);
            }
        }

        private async void AddTodo()
        {
            if (string.IsNullOrWhiteSpace(NewTodoTitle))
                return;

            var newTodo = new TodoItem
            {
                Title = NewTodoTitle,
                IsCompleted = false,
                CreatedAt = DateTime.UtcNow
            };

            await _todoRepository.AddTodoAsync(newTodo);
            TodoItems.Add(newTodo);
            NewTodoTitle = string.Empty;
        }
    }
}