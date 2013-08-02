Dir['./config/**/*.rb'].each { |f| require f }
Dir['./lib/**/*.rb'].each { |f| require f }

require 'sinatra'

get '/dashboard.html' do
  haml :dashboard
end

get '/new.html' do
  haml :new
end

get '/decode.html' do
  haml :decode
end

get '/*' do
  haml :index
end
