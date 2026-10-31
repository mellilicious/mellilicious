"""Schneidet Abbildungen aus den gerenderten Seiten (827x1170-Koordinaten, 2x Auflösung)."""
import sys, os
from PIL import Image
SRC = sys.argv[1]          # Verzeichnis mit p-01.jpg ... (1654x2341)
OUT = sys.argv[2]
S = 2
# name: (seite, x0, y0, x1, y1)
C = {
 # Cover
 'cover_net': (1,150,555,730,875),
 # 1 Intro
 'intro_globe': (2,95,280,160,340), 'intro_devops': (2,632,318,737,382),
 'intro_cs': (2,105,468,395,552), 'intro_lan': (2,438,462,505,518), 'intro_wan': (2,438,522,505,578), 'intro_inet': (2,438,584,505,640),
 'intro_flow': (2,100,672,775,830), 'intro_use': (2,100,865,770,948),
 # 2 Devices
 'dev_hub': (3,108,285,215,330), 'dev_switch': (3,108,365,215,425), 'dev_router': (3,108,450,215,530),
 'dev_gateway': (3,438,252,502,330), 'dev_modem': (3,438,360,520,438), 'dev_firewall': (3,438,470,520,545),
 # 3 OSI
 'osi_pdu': (4,85,712,345,935), 'osi_mnemo': (4,355,718,508,828),
 # 4 TCP/IP
 'tcpip_vs': (5,460,275,780,520), 'tcpip_encap': (5,95,595,395,830), 'tcpip_journey': (5,410,610,775,750),
 # 5 IP addressing
 'ip_globe': (6,438,278,502,338), 'ip_house': (6,436,395,512,470), 'ip_loop': (6,640,552,752,645),
 'ip_cidr': (6,425,750,722,828), 'ip_cidr_ranges': (6,392,845,742,935),
 # 6 Subnetting
 'sub_struct': (7,390,255,745,500), 'sub_net': (7,540,785,780,960),
 # 7 MAC & ARP
 'mac_nic': (8,330,288,425,392), 'arp_icon': (8,288,498,425,552), 'arp_proc': (8,435,490,772,742), 'arp_flow': (8,438,758,775,832),
 # 8 TCP vs UDP
 'tcp_hs': (9,100,440,372,655), 'tcp_examples': (9,412,462,782,650), 'tcp_phone': (9,468,962,582,1022),
 # 9 Ports (Icons je Zeile)
 'port_http': (10,112,312,172,368), 'port_https': (10,112,368,172,424), 'port_ssh': (10,112,425,172,481),
 'port_dns': (10,112,482,172,538), 'port_ftp': (10,112,539,172,593), 'port_sftp': (10,112,594,172,648), 'port_smtp': (10,112,649,172,693),
 'port_mysql': (10,112,722,172,758), 'port_pg': (10,112,757,172,790), 'port_mongo': (10,112,790,172,822), 'port_redis': (10,112,825,172,868),
 # 10 DNS
 'dns_type': (11,105,355,372,462), 'dns_flow': (11,395,255,778,477),
 'dns_a': (11,106,540,152,578), 'dns_cname': (11,106,588,152,626), 'dns_mx': (11,106,636,152,674), 'dns_txt': (11,106,684,152,722),
 'dns_devops': (11,95,775,440,948),
 # 11 HTTP
 'http_life': (12,100,245,770,385), 'http_tls': (12,100,625,490,805), 'http_shield': (12,350,842,492,975),
 # 12 Routing
 'rt_router': (13,95,340,385,418), 'rt_gw': (13,95,530,390,620), 'rt_nat': (13,405,490,775,632),
 'rt_journey': (13,95,700,470,845), 'rt_real': (13,490,740,775,945),
 # 13 Firewalls
 'fw_basic': (14,105,305,382,410), 'fw_vpn': (14,100,830,385,935), 'fw_bastion': (14,400,830,775,945),
 # 14 LB
 'lb_why': (15,255,232,612,405), 'lb_fwd': (15,440,450,775,522), 'lb_rev': (15,100,650,435,742),
 'lb_nginx': (15,445,655,502,722), 'lb_ha': (15,350,820,582,990),
 # 15 Docker
 'dk_over': (16,100,345,322,462), 'dk_bridge': (16,330,360,550,510), 'dk_host': (16,555,345,745,442),
 'dk_none': (16,100,600,322,715), 'dk_overlay': (16,330,590,642,715), 'dk_port': (16,100,805,332,922), 'dk_dns': (16,345,810,642,925),
 # 16 K8s
 'k8_pod': (17,100,345,395,482), 'k8_svc': (17,440,368,782,492), 'k8_cip': (17,100,585,322,702),
 'k8_np': (17,335,555,545,702), 'k8_lb': (17,548,565,748,702), 'k8_ing': (17,90,775,382,975),
 # 17 VPC
 'vpc_arch': (18,365,255,668,610), 'vpc_sg': (18,100,858,350,932),
}

# Korrekturen nach Sichtprüfung
C.update({
 'arp_flow': (8,425,758,775,832), 'arp_proc': (8,435,490,772,718),
 'dev_hub': (3,108,268,215,325),
 'dk_dns': (16,345,810,642,886), 'dk_port': (16,100,805,332,888), 'dns_devops': (11,95,775,440,933),
 'dns_a': (11,106,540,148,578), 'dns_cname': (11,106,588,148,626), 'dns_mx': (11,106,636,148,674), 'dns_txt': (11,106,684,148,722),
 'fw_bastion': (14,400,830,775,920), 'fw_vpn': (14,100,830,385,927),
 'http_bar': (12,352,842,480,878), 'http_shield': (12,378,878,482,975),
 'intro_devops': (2,632,318,748,382), 'intro_lan': (2,438,462,505,513), 'ip_house': (6,436,395,500,470),
 'k8_cip': (17,100,572,330,702), 'k8_ing': (17,90,780,382,975), 'k8_lb': (17,548,560,790,692),
 'k8_np': (17,328,555,545,692), 'k8_svc': (17,440,358,790,488),
 'lb_ha': (15,335,790,562,946), 'lb_rev': (15,100,640,435,718), 'lb_why': (15,315,222,612,405),
 'mac_nic': (8,327,288,425,392), 'osi_pdu': (4,80,712,350,935),
 'rt_journey': (13,95,700,470,862), 'rt_nat': (13,405,490,775,614),
 'sub_struct': (7,390,255,770,490), 'tcpip_journey': (5,410,610,790,750), 'vpc_arch': (18,365,255,658,610),
})
for k,v in list(C.items()):
    if k.startswith('port_'):
        pg,x0,y0,x1,y1 = v; C[k]=(pg,x0,y0+5,x1,y1-4)

os.makedirs(OUT, exist_ok=True)
cache = {}
for name,(pg,x0,y0,x1,y1) in C.items():
    if pg not in cache: cache[pg] = Image.open(os.path.join(SRC, f'p-{pg:02d}.jpg')).convert('RGB')
    im = cache[pg].crop((x0*S,y0*S,x1*S,y1*S))
    im.save(os.path.join(OUT, name+'.jpg'), quality=90, optimize=True)
print(len(C), 'crops')
