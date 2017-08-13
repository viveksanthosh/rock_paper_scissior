FROM node:8.2

WORKDIR /var

EXPOSE 80

ADD ./package.json      package.json 
ADD ./package-lock.json package-lock.json 
ADD ./config.ts         config.ts 
ADD ./domains           domains
ADD ./entry.ts          entry.ts   
ADD ./services          services  
ADD ./tsconfig.json     tsconfig.json
ADD ./ui                ui

RUN npm i
RUN cd ui/ && npm i && && npm run build cd ..
CMD npm start

