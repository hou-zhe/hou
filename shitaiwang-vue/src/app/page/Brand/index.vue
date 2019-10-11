<template>
	<div class="page-wrapper">
		<div class="header">
			<a class="iconfont icon-back" @click="$router.back();"></a>
			<h2 class="title">品牌</h2>
		</div>
		<div class="content">
			<span class="search">
				<input  v-model="name"/><i class="iconfont icon-search" @click="search"></i>
			</span>
			<ul class="list">
				<li><a href="#a">A</a></li>
				<li><a href="#b">B</a></li>
				<li><a href="#c">C</a></li>
				<li><a href="#d">D</a></li>
				<li><a href="#e">E</a></li>
				<li><a href="#f">F</a></li>
				<li><a href="#g">G</a></li>
				<li><a href="#h">H</a></li>
				<li><a href="#i">I</a></li>
				<li><a href="#j">J</a></li>
				<li><a href="#k">K</a></li>
				<li><a href="#l">L</a></li>
				<li><a href="#m">M</a></li>
				<li><a href="#n">N</a></li>
				<li><a href="#o">O</a></li>
				<li><a href="#p">P</a></li>
				<li><a href="#q">Q</a></li>
				<li><a href="#r">R</a></li>
				<li><a href="#s">S</a></li>
				<li><a href="#t">T</a></li>
				<li><a href="#u">U</a></li>
				<li><a href="#v">V</a></li>
				<li><a href="#w">W</a></li>
				<li><a href="#x">X</a></li>
				<li><a href="#y">Y</a></li>
				<li><a href="#z">Z</a></li>
			</ul>
			<div><h3>0-9</h3><p>3.1 PHILLIP LIM</p></div>
			<div id="a"><h3>A</h3>
				<p>ACNE STUDIOS</p>
				<p>ALEXANDER MCQUEEN</p>
				<p>ALEXANDER WANG</p>
				<p>ANYA HINDMARCH</p>
				<p>ALAIA</p>
				<p>ADIDAS</p>
				<p>AVEC MODERATION</p>
				<p>ALBERTA FERRETTI</p>
				<p>ALESSANDRA RICH</p>
				<p>ASH</p>
				<p>ASPESI</p>
			</div>
			<div id="b"><h3>B</h3>
				<p>BURBERRY</p>
				<p>BVLGARI</p>
				<p>BOTTEGA VENETA</p>
				<p>BALENCIAGA</p>
				<p>BOUTIQUE MOSCHINO</p>
				<p>BALLY</p>
				<p>B-Low the Belt</p>
			</div>
			<div id="c"><h3>C</h3>
				<p>CHRISTIAN DIOR</p>
				<p>CHIARA FERRAGNI</p>
				<p>CHRISTIAN LOUBOUNTIN</p>
				<p>CANADA GOOSE</p>
				<p>CHLOE</p>
				<p>CHURCHS</p>
				<p>COACH</p>
				<p>CARVEN</p>
				<p>CELINE</p>
				<p>CHANEL</p>
				<p>CULT GAIA</p>
				<p>CITIZENS OF HUMANITY</p>
			</div>
			<div id="d"><h3>D</h3>
				<p>DOLCE&GABBANA</p>
				<p>DELVAUX</p>
				<p>DIOR HOMME</p>
				<p>DONDUP</p>
				<p>DUVETICA</p>
			</div>
			<div id="e"><h3>E</h3>
				<p>EMLIO PUCCI</p>
				<p>ERMANNO SCERVINO</p>
				<p>ETRO</p>
				<p>EMPORIO ARMANI</p>
				<p>EQUIPMENT</p>
				<p>ERMENEGILDO ZEGNA</p>
				<p>Emporio Armani</p>
			</div>
			<div id="f"><h3>F</h3>
				<p>FENDI</p>
				<p>FURLA</p>
				<p>FAUSTO PUGLISI</p>
				<p>FORTE FORTE</p>
			</div>
			<div id="g"><h3>G</h3>
				<p>GIVENCHY</p>
				<p>GUCCI</p>
				<p>CIUSEPPE ZANOTTI</p>
				<p>GOLDEN GOOSE</p>
				<p>GCDS</p>
			</div>
			<div id="h"><h3>H</h3>
				<p>HOGAN</p>
				<p>HISTORY REPEATS</p>
				<p>Hermes</p>
				<p>HELMUT LANG</p>
			</div>
			<div id="i"><h3>I</h3>
				<p>ISABEL MARANT</p>
				<p>ISSEY MIYAKE</p>
				<p>IH NOM UH NIT</p>
			</div>
			<div id="j"><h3>J</h3>
				<p>J BRAND</p>
				<p>JIMMY CHOO</p>
				<p>JIL SANDER</p>
				<p>JBRAND</p>
				<p>J.W.ANDERSON</p>
			</div>
			<div id="k"><h3>K</h3>
				<p>KENZO</p>
				<p>KHRISJOY</p>
			</div>
			<div id="l"><h3>L</h3>
				<p>LONGCHAMP</p>
				<p>LANVIN</p>
				<p>LOEWE</p>
				<p>LOVE  MOSCHINO</p>
				<p>LES(ART)ISTS</p>
				<p>Louis Vuitton</p>
			</div>
			<div id="m"><h3>M</h3>
				<p>MOSCHINO</p>
				<p>MCM</p>
				<p>MICHAEL KORS</p>
				<p>MANOLO BLAHNIK</p>
				<p>MONCLER</p>
				<p>MALO</p>
				<p>MAISON MARTIN MARGIELA</p>
				<p>MARCELO BURLON</p>
				<p>MAXMARA</p>
				<p>MR & MRS ITALY</p>
				<p>MSGM</p>
				<p>MIU MIU</p>
				<p>MAISON MICHEL</p>
			</div>
			<div id="n"><h3>N</h3>
				<p>N 21</p>
				<p>NEIL BARRETT</p>
				<p>NIELS PEERAER</p>
			</div>
			<div id="o"><h3>O</h3>
				<p>OFF-WHITE</p>
				<p>OPENING CEREMONY</p>
			</div>
			<div id="p"><h3>P</h3>
				<p>PRADA</p>
				<p>PINKO</p>
				<p>PHILIPP PLEIN</p>
				<p>PIERRE HARDY</p>
				<p>Proenza Schouler</p>
				<p>P.A.R.O.S.H.</p>
				<p>PHILOSOPHY</p>
				<p>PHILIPP PLEIN</p>
				<p>PALM ANGELS</p>
			</div>
			<div id="q"></div>
			<div id="r"><h3>R</h3>
				<p>ROGER VIVIER</p>
				<p>RALPH LAUREN</p>
				<p>RED VALETION</p>
				<p>RENE CAOVILLA</p>
				<p>RICK OWENS</p>
				<p>ROBERTO CAVALLI</p>
				<p>RUSLAN BAGINSKIY</p>
				<p></p>
			</div>
			<div id="s"><h3>S</h3>
				<p>STUART WEITZMAN</p>
				<p>SAINT LAURENT</p>
				<p>SALVATORE FERRAGAMO</p>
				<p>STELLA MCCARTNEY</p>
				<p>SOPHIE HULME</p>
				<p>SEE BY CHLOE</p>
				<p>SELF-PORTRAIT</p>
				<p>SERGIO ROSSI</p>
				<p>SMFK</p>
				<p>STAND</p>
			</div>
			<div id="t"><h3>T</h3>
				<p>THOM BROWNE</p>
				<p>TOM FORD</p>
				<p>TORY BURCH</p>
				<p>TAGLIATORE</p>
			</div>
			<div id="u"></div>
			<div id="v"><h3>V</h3>
				<p>VALENTINO</p>
				<p>VICTORIA BECKHAM</p>
				<p>VERSACE</p>
				<p>VERSUS VERSACE</p>
				<p>VIVETTA</p>
				<p>VETEMENTS</p>
				<p>Valextra</p>
			</div>
			<div id="w"><h3>W</h3>
				<p>WOOLRICH</p>
			</div>
			<div id="x"></div>
			<div id="y"><h3>Y</h3>
				<p>Y-3</p>
			</div>
			<div id="z"></div>
		</div>
		<div class="footer">
			<StNav></StNav>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import StNav from'../../components/StNav';
	export default {
	        components: {StNav},
		data() {
	                return {
	                        name: ''
	                }
		},
		methods: {
	                search() {

	                }
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.page-wrapper
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		.header
			height: 0.7rem
			flex-shrink: 0
			display: flex
			justify-content: space-between
			align-items: center
			border-bottom: 1px solid #666
			a
				width: 0.8rem
				text-align: center
				font-size: 0.32rem
			h2.title
				font-weight: normal
				font-size: 0.36rem
		.header:after
			content: ''
			width: 0.8rem
		.content
			flex-grow: 1
			padding: 0.2rem
			overflow: auto
			.search
				position: relative
				input
					width: 100%
					height: 0.7rem
					margin-bottom: 0.3rem
				i
					font-size: 0.4rem
					position: absolute
					top: 0
					right: 0.2rem
			ul
				position: fixed
				top: 1.8rem
				right: 0.3rem
				li
					margin-bottom: 0.1rem
					a
						transition: all 0.4s
					a:click
						transform: translate(50deg)
			div
				margin-bottom: 1rem
				p
					width: 5rem
					color: #9e9e9e
					margin-top 0.1rem
					cursor: pointer
		.footer
			flex-shrink: 0
			height: 1rem
			width: 100%
			border-top: 1px solid #000
</style>