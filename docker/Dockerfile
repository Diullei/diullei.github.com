FROM grahamc/jekyll
MAINTAINER diullei@gmail.com

RUN gem install pygments.rb

ENTRYPOINT ["jekyll"]

# docker run --rm -v "C:\Users\gomes\Documents\GitHub\diullei.github.com:/src" jekyll build
# docker run --rm -v "C:\Users\gomes\Documents\GitHub\diullei.github.com:/src" jekyll server -H 0.0.0.0
# on windows, don't forget to share C driver
