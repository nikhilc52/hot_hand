library(tidyverse)
library(dplyr)

data <- read_csv('bias.csv')
working <- data

working[data == 0] <- NA
working <- working |> 
  mutate(n = row_number())

cols <- c("i=1"="#006699","i=2"="#6EB43F","i=3"="#EF4035")
ggplot(working)+
  scale_color_identity()+
  geom_line(aes(x=n, y=`0`, color='i=1'))+
  geom_line(aes(x=n, y=`1`, color='i=1'))+
  geom_line(aes(x=n, y=`2`, color='i=1'))+
  geom_line(aes(x=n, y=`3`, color='i=2'))+
  geom_line(aes(x=n, y=`4`, color='i=2'))+
  geom_line(aes(x=n, y=`5`, color='i=2'))+
  geom_line(aes(x=n, y=`6`, color='i=3'))+
  geom_line(aes(x=n, y=`7`, color='i=3'))+
  geom_line(aes(x=n, y=`8`, color='i=3'))+
  geom_hline(yintercept = 0.25, linetype='longdash')+
  geom_hline(yintercept = 0.5, linetype='longdash')+
  geom_hline(yintercept = 0.75, linetype='longdash')+
  scale_x_continuous('n', breaks=seq(0,100, 10), limits=c(0,100), expand=c(0,0))+
  scale_y_continuous('Observed Proportion', breaks=seq(0, 1, 0.1), limits=c(0.1,0.8), expand = c(0,0))+
  scale_color_manual(values=cols)+
  annotate("text",label="p=.75", x=50, y=0.7, size=4)+
  annotate("text",label="p=.5", x=50, y=0.45, size=4)+
  annotate("text",label="p=.25", x=50, y=0.2, size=4)+
  theme_bw()+
  theme(panel.grid.major = element_blank(),
        panel.grid.minor = element_blank(),
        
        axis.text.x = element_text(size=12),
        axis.text.y = element_text(size=12),
        axis.title.x = element_text(size=12),
        axis.title.y = element_text(size=12),
        axis.ticks.length.x = unit(-4, "pt"),
        axis.ticks.length.y = unit(-4, "pt"),
        
        legend.position="inside",
        legend.position.inside = c(.875,.75),
        legend.title = element_blank(),
        legend.background = element_rect(color="black"),
        legend.key.width = unit(50,"pt"),
        legend.text = element_text(size=12))

