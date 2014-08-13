class RegistrationsController < Devise::RegistrationsController

  def edit
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
  end

  private
  #extend Devise registration controller for custom fields

  def sign_up_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end

end
