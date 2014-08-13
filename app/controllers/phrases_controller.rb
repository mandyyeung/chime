class PhrasesController < ApplicationController

  def new
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    @list = List.find(params[:list_id])
    @phrase = @list.phrases.build
  end

  def create
    @list = List.find(params[:list_id])
    @phrase = @list.phrases.build(phrase_params)
    respond_to do |format|
      if @phrase.save
        format.html { redirect_to phrase_path(@list,@phrase), notice: 'Phrase was successfully created' }
      else
        format.html { render action: 'new'}
      end
    end
  end

  def edit
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    set_phrase
  end

  def update
    set_phrase
    respond_to do |format|
      if @phrase.update(phrase_params)
        format.html { redirect_to phrase_path(set_phrase), notice: 'Phrase was successfully updated'}
      else
        format.html { render action: 'edit'}
      end
    end
  end

  def show
    set_phrase
  end

  def index
  end

  private

  def set_phrase
    @phrase = Phrase.find(params[:id])
  end

  def phrase_params
    params.require(:phrase).permit(:id, :chinese, :pinyin, :definition, lists_attributes: [:id])
  end


end
