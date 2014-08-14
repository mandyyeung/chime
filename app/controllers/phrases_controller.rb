class PhrasesController < ApplicationController

  def index
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    @search = Phrase.search do
      fulltext params[:search]
    end
    @phrases = @search.results
  end

  def new
    @list = List.find(params[:list_id])
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    add_breadcrumb "<a href='/lists/#{@list.id}'><i class='fa #{@list.icon}'></i> #{@list.name}</a>".html_safe
    @phrase = @list.phrases.build
  end

  def create
    @list = List.find(params[:list_id])
    @phrase = @list.phrases.build(phrase_params)
    respond_to do |format|
      if @phrase.save
        format.html { redirect_to phrase_path(@phrase), notice: 'Phrase was successfully created' }
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
    add_breadcrumb '<a href="/lists"><i class="fa fa-list"></i> Home</a>'.html_safe
    add_breadcrumb "<a href='/lists/#{set_phrase.list.id}'><i class='fa #{set_phrase.list.icon}'></i> #{set_phrase.list.name}</a>".html_safe
    add_breadcrumb "#{set_phrase.chinese}".html_safe

  end

  private

  def set_phrase
    @phrase = Phrase.find(params[:id])
  end

  def phrase_params
    params.require(:phrase).permit(:id, :chinese, :pinyin, :definition, :image, :remote_image_url, lists_attributes: [:id])
  end


end
