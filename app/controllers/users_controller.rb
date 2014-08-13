class UsersController < ApplicationController

  def show
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    @user = User.find(params[:id])
    respond_to do |format|
        format.html # show.html.erb
        format.xml { render :xml => @user }
    end
  end

end
