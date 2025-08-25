using System;
using Microsoft.Maui.Controls;
using maui_todo_mongo.ViewModels;

namespace maui_todo_mongo.Views
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
            BindingContext = new MainViewModel();
        }

        protected override void OnAppearing()
        {
            base.OnAppearing();
            // Load data or perform any actions needed when the page appears
        }
    }
}