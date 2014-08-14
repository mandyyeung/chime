class ListsController < ApplicationController
  before_action :verify_user
  skip_before_action :verify_user, only: [:new, :create, :index]

  def new
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    @list = List.new
    @lists = List.all - current_user.lists
  end

  def create
    @list = List.new(list_params)
    respond_to do |format|
      if @list.save
        current_user.lists << @list
        format.html { redirect_to @list, notice: 'List was successfully created' }
      else
        format.html { render action: 'new'}
      end
    end
  end

  def edit
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    set_list
  end

  def update
    set_list
    respond_to do |format|
      if @list.update(list_params)
        format.html { redirect_to @list, notice: 'List was successfully updated'}
      else
        format.html { render action: 'edit'}
      end
    end
  end

  def show
    set_list
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    add_breadcrumb "<i class='fa #{List.find(params[:id]).icon}'></i> #{List.find(params[:id]).name}".html_safe
  end

  def index
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe, lists_path
    @lists = current_user.lists
  end

  private

  def set_list
    @list = List.find(params[:id])
  end

  def list_params
    params.require(:list).permit(:id, :name, :icon)
  end

  def verify_user
    unless current_user.lists.include?(set_list)
      flash[:alert] = "Uhoh, you do not have access to that list!"
      redirect_to lists_path
    end
  end

end
