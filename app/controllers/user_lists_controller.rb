class UserListsController < ApplicationController

  def create
    @user_list = UserList.new(user_id: current_user.id, list_id: params[:list_id])
    respond_to do |format|
      if @user_list.save
        format.html { redirect_to list_path(@user_list.list_id), notice: 'List was successfully added' }
      else
        format.html { render action: 'new'}
      end
    end
  end

end
